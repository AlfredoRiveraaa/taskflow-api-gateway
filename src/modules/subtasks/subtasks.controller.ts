import { Response } from 'express';
import { AuthRequest } from '../../types/auth.types.js';
import prisma from '../../utils/prisma.js';

export const createSubtask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { taskId, titulo } = req.body;

    if (!taskId || !titulo) {
      res.status(400).json({ error: 'El ID de la tarea y el título son obligatorios' });
      return;
    }

    const nuevaSubtarea = await prisma.subtask.create({
      data: {
        taskId,
        titulo
      }
    });

    res.status(201).json({
      mensaje: 'Subtarea creada exitosamente',
      subtarea: nuevaSubtarea
    });
  } catch (error) {
    console.error('Error al crear subtarea:', error);
    res.status(500).json({ error: 'Error al crear la subtarea' });
  }
};

export const toggleSubtask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { completada } = req.body;

    const subtareaActualizada = await prisma.subtask.update({
      where: { id: id as string },
      data: { completada }
    });

    res.status(200).json({
      mensaje: 'Estado de la subtarea actualizado',
      subtarea: subtareaActualizada
    });
  } catch (error) {
    console.error('Error al actualizar subtarea:', error);
    res.status(500).json({ error: 'Error al actualizar la subtarea' });
  }
};