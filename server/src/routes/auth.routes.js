import { Router } from "express";
import {
  loginController,
  selfController,
  signupController,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/protect.js";
import passport from "passport";

const router = Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/me", protect, selfController);

// OAuth routes

router.get("/google",
  passport.authenticate("google", 
    { 
      scope: ["profile", "email", "https://www.googleapis.com/auth/drive.file"],
      accessType: "offline",
      prompt: "consent" 
    })
);

router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/login?error=oauth_failed", session: false }),
  (req, res) => {

    if(!req.user || !req.user.token) {
      return res.redirect("/login?error=auth_failed");
    }
    const frontendURL = process.env.FRONTEND_URL || "http://localhost:3000";
    const redirectUrl = (`${frontendURL}/auth-success?token=${req.user.token}&refreshToken=${req.user.refreshToken || ''}&googleDriveAccessToken=${req.user?.user?.googleDriveAccessToken || ''}`);

    res.redirect(redirectUrl);
    }
);

export default router;
