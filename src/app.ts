import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app: Application = express();

// Middlewares globales de configuración y seguridad
app.use(express.json()); // Permite recibir datos en formato JSON
app.use(cors());         // Permite peticiones desde el frontend
app.use(helmet());       // Añade cabeceras de seguridad HTTP

// Ruta de prueba (Health Check)
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    estado: 'ok', 
    mensaje: 'API Gateway de TaskFlow funcionando correctamente' 
  });
});

export default app;