import { Router } from 'express';
import { createTask, getTasksByProject, updateTask } from './tasks.controller.js';
import { authenticateToken } from '../../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authenticateToken, createTask);
router.get('/proyecto/:proyectoId', authenticateToken, getTasksByProject);
router.put('/:id', authenticateToken, updateTask);

export default router;