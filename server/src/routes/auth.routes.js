import { Router } from "express";
import {
  loginController,
  selfController,
  signupController,
} from "../controllers/auth.controller";
import { protect } from "../middlewares/protect";
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
  passport.authenticate("google", { failureRedirect: "/login?error=oauth_failed" }),
  (req, res) => {

    if(!req.user || !req.user.token) {
      return res.redirect("/login?error=auth_failed");
    }
    const redirectUrl = `/dashboard?token=${encodeURIComponent(req.user.token)}&refreshToken=${encodeURIComponent(req.user.refreshToken || '')}&googleDriveAccessToken=${encodeURIComponent(req.user?.user?.googleDriveAccessToken || '')}`;

    res.redirect(redirectUrl);
    }
);

export default router;
