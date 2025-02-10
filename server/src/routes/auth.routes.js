import { Router } from "express";
import { loginController, selfController, signupController } from "../controllers/auth.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.post('/signup', signupController);
router.post('/login', loginController);
router.post('/me', protect, selfController);

export default router;