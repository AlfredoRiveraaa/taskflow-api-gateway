import { Response } from 'express';
import { AuthRequest } from '../../types/auth.types.js';
import prisma from '../../utils/prisma.js';

export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { titulo, descripcion, prioridad, proyectoId, fechaLimite } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Usuario no identificado' });
      return;
    }

    const nuevaTarea = await prisma.task.create({
      data: {
        titulo,
        descripcion,
        prioridad: prioridad || 'MEDIA',
        proyectoId,
        creadoPorId: userId,
        fechaLimite: fechaLimite ? new Date(fechaLimite) : null,
        estado: 'Backlog',
      }
    });

    res.status(201).json({
      mensaje: 'Tarea creada exitosamente',
      tarea: nuevaTarea
    });
  } catch (error) {
    console.error('Error al crear tarea:', error);
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
};

export const getTasksByProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { proyectoId } = req.params;

    const tareas = await prisma.task.findMany({
      where: { proyectoId: proyectoId as string },
      orderBy: { orden: 'asc' },
      include: {
        asignadoA: {
          select: { id: true, nombre: true, correo: true }
        }
      }
    });

    res.status(200).json(tareas);
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    res.status(500).json({ error: 'Error al obtener las tareas' });
  }
};

export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, estado, prioridad, columna, asignadoAId, sprintId } = req.body;

    const tareaActualizada = await prisma.task.update({
      where: { id: id as string },
      data: {
        titulo,
        descripcion,
        estado,
        prioridad,
        columna,
        asignadoAId,
        sprintId
      }
    });

    res.status(200).json({
      mensaje: 'Tarea actualizada exitosamente',
      tarea: tareaActualizada
    });
  } catch (error) {
    console.error('Error al actualizar tarea:', error);
    res.status(500).json({ error: 'Error al actualizar la tarea. Verifica que el ID sea correcto.' });
  }
};