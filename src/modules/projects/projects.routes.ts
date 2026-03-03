import { Router } from 'express';
import { createProject, getMyProjects } from './projects.controller.js';
import { authenticateToken } from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authenticateToken, getMyProjects);
router.post('/', authenticateToken, createProject);

export default router;