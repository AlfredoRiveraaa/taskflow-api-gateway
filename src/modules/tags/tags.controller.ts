import { Response } from 'express';
import { AuthRequest } from '../../types/auth.types.js';
import prisma from '../../utils/prisma.js';

export const createTag = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { nombre, color } = req.body;

    if (!nombre || !color) {
      res.status(400).json({ error: 'El nombre y el color son obligatorios' });
      return;
    }

    const nuevaEtiqueta = await prisma.tag.create({
      data: { nombre, color }
    });

    res.status(201).json({
      mensaje: 'Etiqueta creada exitosamente',
      tag: nuevaEtiqueta
    });
  } catch (error) {
    console.error('Error al crear etiqueta:', error);
    res.status(500).json({ error: 'Error al crear la etiqueta' });
  }
};

export const assignTagToTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { taskId } = req.params;
    const { tagId } = req.body;

    if (!tagId) {
      res.status(400).json({ error: 'El ID de la etiqueta es obligatorio' });
      return;
    }

    const asignacion = await prisma.taskTag.create({
      data: {
        taskId: taskId as string,
        tagId: tagId
      },

      include: {
        etiqueta: true 
      }
    });

    res.status(201).json({
      mensaje: 'Etiqueta asignada a la tarea',
      asignacion
    });
  } catch (error) {
    console.error('Error al asignar etiqueta:', error);
    res.status(400).json({ error: 'Error al asignar la etiqueta. ¿Ya estaba asignada a esta tarea?' });
  }
};