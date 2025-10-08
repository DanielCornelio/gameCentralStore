import {Router} from "express";
import { clearCartByUserId, createCart, getCartByEmail } from "../controllers/carrito.controller.js";
import { verifyToken } from "../middlewares/authorization.js";

const router = Router();

router.get("/carrito", verifyToken, getCartByEmail);
router.post("/carrito", verifyToken, createCart);
router.delete("/carrito/:id", verifyToken, clearCartByUserId);


export default router;