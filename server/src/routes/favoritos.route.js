import { Router } from "express";
import { createFavorite, deleteFavorite, getFavoritesByEmail } from "../controllers/favoritos.controller.js";

const router = Router();

router.get('/favoritos', getFavoritesByEmail);
router.post('/favoritos', createFavorite)
router.delete('/favoritos/:id', deleteFavorite);

export default router;