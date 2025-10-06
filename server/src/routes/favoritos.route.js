import { Router } from "express";
import { createFavorite, deleteFavorite, getFavorites } from "../controllers/favoritos.controller.js";

const router = Router();

router.get('/favoritos', getFavorites);
router.post('/favoritos', createFavorite)
router.delete('/favoritos/:id', deleteFavorite);

export default router;