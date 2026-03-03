import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/auth.types.js';

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Acceso denegado. No se proporcionó un token.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string; correo: string };

    req.user = decoded;

    next();
  } catch (error) {
    res.status(403).json({ error: 'Token inválido o expirado.' });
  }
};