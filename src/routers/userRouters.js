import { Router } from "express";
import { signin, signup } from "../controllers/userControllers.js";
import { signinValidation, signupValidation } from "../middlewares/userMiddlewares.js";
const router = Router();

router.post("/signup", signupValidation, signup);
router.post("/signin", signinValidation, signin);
export default router;