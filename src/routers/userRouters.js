import { Router } from "express";
import { ranking, showMe, signin, signup } from "../controllers/userControllers.js";
import { signinValidation, signupValidation } from "../middlewares/userMiddlewares.js";
import { validateToken } from "../middlewares/validateTokenMiddleware.js";
const router = Router();

router.post("/signup", signupValidation, signup);
router.post("/signin", signinValidation, signin);
router.get("/users/me", validateToken, showMe);
router.get("/ranking", ranking);
export default router;