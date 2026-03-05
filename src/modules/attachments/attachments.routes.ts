import { Router } from 'express';
import { addAttachment } from './attachments.controller.js';
import { authenticateToken } from '../../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authenticateToken, addAttachment);

export default router;