import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserByEmail,
  register,
  updateUser,
} from "../controllers/usarios.controller.js";
import { verifyToken } from "../middlewares/authorization.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = Router();

router.get("/usuarios", verifyToken, verifyAdmin, getAllUsers);
router.get("/usuarios", verifyToken, getUserByEmail);
router.post("/usuarios", register);
router.put("/usuarios/:id", verifyToken, updateUser);
router.delete("/usuarios/:id", verifyToken, verifyAdmin, deleteUser);

export default router;
