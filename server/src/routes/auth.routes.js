import { Router } from "express";
import { loginController, selfController, signupController } from "../controllers/auth.controller";

const router = Router();

router.post('/signup', signupController);
router.post('/login', loginController);
router.post('/me', selfController);

export default router;