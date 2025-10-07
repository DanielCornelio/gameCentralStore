import { Router } from 'express';
import { getAllUsers, createUser, getUserByEmail } from '../controllers/usarios.controller.js';
import { authorize } from '../middlewares/authorization.js';

const router = Router();

router.get('/usuarios', getAllUsers);
router.get('/usuarios', authorize, getUserByEmail);
router.post('/usuarios', createUser);

export default router;