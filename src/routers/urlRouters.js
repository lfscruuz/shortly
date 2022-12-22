import { Router } from "express";
import { getUrlById, openUrl, postShorten, removeUrl } from "../controllers/urlControllers.js";
import { checkIfUrlIdExists, validateUrlSchema } from "../middlewares/urlMiddlewares.js";
import { validateToken } from "../middlewares/validateTokenMiddleware.js";

const router = Router();

router.post("/urls/shorten", validateToken, validateUrlSchema, postShorten)
router.get("/urls/:id", checkIfUrlIdExists, getUrlById);
router.get("/urls/open/:shortUrl", openUrl);
router.delete("/urls/:id", checkIfUrlIdExists, validateToken, removeUrl);
export default router;