import express, { Application, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './modules/auth/auth.routes.js';
import { authenticateToken } from './middlewares/auth.middleware.js';
import { AuthRequest } from './types/auth.types.js';
import projectRoutes from './modules/projects/projects.routes.js';
import taskRoutes from './modules/tasks/tasks.routes.js';
import sprintRoutes from './modules/sprints/sprints.routes.js';
import commentRoutes from './modules/comments/comments.routes.js';
import subtaskRoutes from './modules/subtasks/subtasks.routes.js';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/sprints', sprintRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/subtasks', subtaskRoutes);

app.get('/api/auth/perfil', authenticateToken, (req: AuthRequest, res: Response) => {
  res.json({
    mensaje: 'Bienvenido al área privada',
    datosUsuario: req.user 
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ estado: 'ok', mensaje: 'API Gateway funcionando' });
});

export default app;