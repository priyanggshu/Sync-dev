import { Router } from "express";
import { google } from "googleapis";
import User from "../db/User.js";
import { protect } from "../middlewares/auth.protect.js";

const router = Router();
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI,
);

router.post("/upload", protect, async (req, res) => {
    const { fileName, fileContent } = req.body;
    const user = await User.findById(req.user.userId);

    if(!user || !user.googleDriveAccessToken) {
        return res.status(403).json({ message: "Google Drive access not granted" });
    }
    
    oauth2Client.setCredentials({
        access_token: user.googleDriveAccessToken,
        refresh_token: user.googleDriveRefreshToken
    });

    if (!user.tokenExpiry || user.tokenExpiry < Date.now()) {
        try {
            const { token } = await oauth2Client.getAccessToken(); // This refreshes if needed
            if (token) {
                user.googleDriveAccessToken = token;
                user.tokenExpiry = Date.now() + 3600 * 1000; // Assuming 1-hour expiry
                await user.save();
                oauth2Client.setCredentials({ access_token: token });
            } else {
                throw new Error("Token refresh failed");
            }
        } catch (error) {
            return res.status(401).json({ message: "Failed to refresh Google token", error: error.message });
        }
    }

    const drive = google.drive({ version: "v3", auth: oauth2Client });

    try {
        const response = await drive.files.create({
            requestBody: {
                name: fileName,
                mimeType: "text/plain"
            },
            media: {
                mimeType: "text/plain",
                body: Buffer.from(fileContent, "utf-8")
            }
        })
        res.json({ fileId: response.data.id, name: fileName, success: true });
    } catch (error) {
        res.status(500).json({ message: "Google Drive upload failed", error})
    }
});

export default router;