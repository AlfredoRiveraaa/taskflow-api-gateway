import { Request, Response, NextFunction } from 'express';
import { ZodType, ZodError } from 'zod';

export const validateSchema = (schema: ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: 'Datos de entrada inválidos',
          detalles: error.issues.map(err => ({
            campo: err.path.join('.'),
            mensaje: err.message
          }))
        });
        return;
      }

      res.status(500).json({ error: 'Error interno de validación' });
    }
  };
};