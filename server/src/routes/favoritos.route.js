import { Router } from "express";
import { createFavorite, deleteFavorite, getFavoritesByEmail } from "../controllers/favoritos.controller.js";
import { verifyToken } from "../middlewares/authorization.js";

const router = Router();

router.get('/favoritos', verifyToken, getFavoritesByEmail);
router.post('/favoritos', verifyToken, createFavorite)
router.delete('/favoritos/:usuario_id/:juego_id', verifyToken, deleteFavorite);

export default router;