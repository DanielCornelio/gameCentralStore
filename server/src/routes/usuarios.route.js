import { Router } from 'express';
import { getAllUsers, getUserByEmail, register } from '../controllers/usarios.controller.js';
import { verifyToken } from '../middlewares/authorization.js';

const router = Router();

router.get('/usuarios', verifyToken, getAllUsers);
router.get('/usuarios', verifyToken, getUserByEmail);
router.post('/usuarios', register);

export default router;