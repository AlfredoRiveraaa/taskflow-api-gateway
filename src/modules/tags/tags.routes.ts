import { Router } from 'express';
import { createTag, assignTagToTask } from './tags.controller.js';
import { authenticateToken } from '../../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authenticateToken, createTag);
router.post('/tarea/:taskId', authenticateToken, assignTagToTask);

export default router;