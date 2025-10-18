import {Router} from "express";
import { createRatings, getRatings } from "../controllers/ratings.controller.js";
import { verifyToken } from "../middlewares/authorization.js";

const router = Router();

router.get("/ratings/:juego_id", getRatings);
router.post("/ratings", verifyToken, createRatings)

export default router;