import { Router } from "express";
import { signup } from "../controllers/userControllers.js";
import { signupValidation } from "../middlewares/userMiddlewares.js";
const router = Router();

router.post("/signup", signupValidation, signup);

export default router;