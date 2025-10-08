import { Router } from "express";
import { createGame, deleteGame, getAllGames, getGame, updateGame } from "../controllers/juegos.controller.js";
import { verifyToken } from "../middlewares/authorization.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = Router();

router.get('/juegos', getAllGames);
router.get('/juegos/:id', getGame);
router.post('/juegos', verifyToken, verifyAdmin, createGame);
router.put('/juegos/:id', verifyToken, verifyAdmin, updateGame);
router.delete('/juegos/:id', verifyToken, verifyAdmin, deleteGame);

export default router;