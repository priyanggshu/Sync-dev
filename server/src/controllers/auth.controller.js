import bcryptjs from "bcryptjs";
import User from "../db/User.js";
import jwt from "jsonwebtoken";
import { signupSchema, loginSchema } from "../validation/types.js";
import { google } from "googleapis";

export const signupController = async (req, res) => {
  try {
    const { username, email, password } = signupSchema.parse(req.body);

    const exists = await User.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ message: "User already exists with these creds" });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashed = await bcryptjs.hash(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashed,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error.message);
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const matches = await bcryptjs.compare(password, existingUser.password);
    if (!matches) {
      return res.status(401).json({ message: "Creds don't match" });
    }

    const token = jwt.sign(
      { userId: existingUser._id, user: existingUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error.message);
  }
};

export const selfController = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if(!user) return res.status(404).json({ message: "User not found" });
    let files = [];

    if(user.googleDriveAccessToken) {
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
      );   

      oauth2Client.setCredentials({
        access_token: user.googleDriveAccessToken,
        refresh_token: user.googleDriveRefreshToken
      });

      const { token } = await oauth2Client.getAccessToken();
      user.googleDriveAccessToken = token;
      await user.save();

      const drive = google.drive({ version: "v3", auth: oauth2Client });

      try {
        const response = await drive.files.list({
          fields: "files(id, name, mimeType)"
        });
                
        files = response.data.files;
      } catch (error) {
        console.log("Failed to fetch Google Drive files", error);
      }
    }
    res.json({ user, files });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error.message);
  }
};
