import jwt from "jsonwebtoken";
import User from "../db/User.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    console.log("Authorization Header:", authHeader); // Debugging

  if (!authHeader.startsWith("Bearer ")) {
    console.log("⛔ No token found in header");
    return res.status(401).json({ message: "Not authorized, no token" });
  }
   
  const token = authHeader.split(' ')[1];
  console.log("Extracted Token:", token);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("Decoded Token:", decoded);
  
  const user = await User.findById(decoded.userId).select('-password');
  console.log("Found User in DB:", user);
  if(!user) {
    console.log("🚨 User not found in database");
    return res.status(401).json({ message: "Not authorized, user not found" });
  }
  
  req.user = user;
  next();
  } catch (error) {
    console.log('JWT error:', error.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
