import { Router } from 'express';
import { createSubtask, toggleSubtask } from './subtasks.controller.js';
import { authenticateToken } from '../../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authenticateToken, createSubtask);
router.put('/:id/toggle', authenticateToken, toggleSubtask);

export default router;