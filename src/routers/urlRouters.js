import { Router } from "express";
import { getUrlById, postShorten } from "../controllers/urlControllers.js";
import { validateUrlSchema } from "../middlewares/urlMiddlewares.js";
import { validateToken } from "../middlewares/validateTokenMiddleware.js";

const router = Router();

router.post("/urls/shorten", validateToken, validateUrlSchema, postShorten)
router.get("/urls/:id", getUrlById);

export default router;