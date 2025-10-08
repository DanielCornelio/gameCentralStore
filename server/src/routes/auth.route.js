import { Router } from "express";
import { loginUser } from "../controllers/auth.controller.js";
import { verifyCredentials } from "../middlewares/authorization.js";

const router = Router();

router.post("/login", verifyCredentials, loginUser);

export default router;