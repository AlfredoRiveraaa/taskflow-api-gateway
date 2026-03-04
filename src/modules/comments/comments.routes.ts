import { Router } from 'express';
import { addComment, getCommentsByTask } from './comments.controller.js';
import { authenticateToken } from '../../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authenticateToken, addComment);
router.get('/tarea/:taskId', authenticateToken, getCommentsByTask);

export default router;