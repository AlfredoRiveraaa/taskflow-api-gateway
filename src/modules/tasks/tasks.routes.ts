import { Router } from 'express';
import { createTask, getTasksByProject, updateTask, getTaskById } from './tasks.controller.js';
import { authenticateToken } from '../../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authenticateToken, createTask);
router.get('/proyecto/:proyectoId', authenticateToken, getTasksByProject);
router.put('/:id', authenticateToken, updateTask);
router.get('/:id', authenticateToken, getTaskById);

export default router;