import { Router } from "express";
import { createGame, deleteGame, getAllGames, getGame, updateGame } from "../controllers/juegos.controller.js";
import { verifyToken } from "../middlewares/authorization.js";

const router = Router();

router.get('/juegos', getAllGames);
router.get('/juegos/:id', getGame);
router.post('/juegos', verifyToken, createGame);
router.put('/juegos/:id', verifyToken, updateGame);
router.delete('/juegos/:id', verifyToken, deleteGame);

export default router;