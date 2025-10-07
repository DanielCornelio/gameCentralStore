import { Router } from "express";
import { createGame, deleteGame, getAllGames, getGame, updateGame } from "../controllers/juegos.controller.js";

const router = Router();

router.get('/juegos', getAllGames);
router.get('/juegos/:id', getGame);
router.post('/juegos', createGame);
router.put('/juegos/:id', updateGame);
router.delete('/juegos/:id', deleteGame);

export default router;