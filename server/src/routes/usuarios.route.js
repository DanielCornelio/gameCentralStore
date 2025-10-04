import { Router } from 'express';
import { getAllUsers, createUser } from '../controllers/usarios.controller.js';

const router = Router();

router.get('/usuarios', getAllUsers);
router.post('/usuarios', createUser);

export default router;