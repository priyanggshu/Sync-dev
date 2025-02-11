import jwt from "jsonwebtoken";
import User from "../db/User.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
   
  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  const user = await User.findById(decoded.userId).select('-password');
  if(!user) {
    return res.status(401).json({ message: "Not authorized, user not found" });
  }
  
  req.user = user;
  next();
  } catch (error) {
    console.log('JWT error:', error.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
