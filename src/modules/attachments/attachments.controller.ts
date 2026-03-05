import { Response } from 'express';
import { AuthRequest } from '../../types/auth.types.js';
import prisma from '../../utils/prisma.js';

export const addAttachment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { taskId, url, nombre, tipo } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Usuario no identificado' });
      return;
    }

    if (!taskId || !url || !nombre || !tipo) {
      res.status(400).json({ error: 'Faltan campos obligatorios (taskId, url, nombre, tipo)' });
      return;
    }

    const nuevoAdjunto = await prisma.attachment.create({
      data: {
        taskId,
        url,
        nombre,
        tipo,
        subidoPorId: userId
      }
    });

    res.status(201).json({
      mensaje: 'Archivo adjunto agregado exitosamente',
      adjunto: nuevoAdjunto
    });
  } catch (error) {
    console.error('Error al agregar adjunto:', error);
    res.status(500).json({ error: 'Error al agregar el archivo adjunto' });
  }
};