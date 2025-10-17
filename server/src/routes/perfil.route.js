import { Router } from "express";
import { verifyToken } from "../middlewares/authorization.js";
import { getMe } from "../controllers/perfil.controller.js";

const router = Router()

router.get('/me', verifyToken, getMe);

export default router;