import { Router } from 'express';
import { createSprint, getSprintsByProject } from './sprints.controller.js';
import { authenticateToken } from '../../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authenticateToken, createSprint);
router.get('/proyecto/:proyectoId', authenticateToken, getSprintsByProject);

export default router;