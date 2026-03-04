import { Response } from 'express';
import { AuthRequest } from '../../types/auth.types.js';
import prisma from '../../utils/prisma.js';

export const createSprint = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { proyectoId, nombre, objetivo, fechaInicio, fechaFin } = req.body;

    if (!proyectoId || !nombre) {
      res.status(400).json({ error: 'El ID del proyecto y el nombre son obligatorios' });
      return;
    }

    const nuevoSprint = await prisma.sprint.create({
      data: {
        proyectoId,
        nombre,
        objetivo,
        fechaInicio: fechaInicio ? new Date(fechaInicio) : null,
        fechaFin: fechaFin ? new Date(fechaFin) : null,
        estado: 'Planificado'
      }
    });

    res.status(201).json({
      mensaje: 'Sprint creado exitosamente',
      sprint: nuevoSprint
    });
  } catch (error) {
    console.error('Error al crear sprint:', error);
    res.status(500).json({ error: 'Error al crear el sprint' });
  }
};

export const getSprintsByProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { proyectoId } = req.params;

    const sprints = await prisma.sprint.findMany({
      where: { proyectoId: proyectoId as string },
      orderBy: { fechaInicio: 'asc' },
      include: {
        tareas: true
      }
    });

    res.status(200).json(sprints);
  } catch (error) {
    console.error('Error al obtener sprints:', error);
    res.status(500).json({ error: 'Error al obtener los sprints' });
  }
};