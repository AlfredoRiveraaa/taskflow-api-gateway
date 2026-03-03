import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './modules/auth/auth.routes.js';

const app: Application = express();

// Middlewares globales de configuración y seguridad
app.use(express.json()); 
app.use(cors());         
app.use(helmet());       

app.use('/api/auth', authRoutes); 

// Ruta de prueba (Health Check)
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    estado: 'ok', 
    mensaje: 'API Gateway de TaskFlow funcionando correctamente' 
  });
});

export default app;