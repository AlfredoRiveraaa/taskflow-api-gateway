import { Response } from 'express';
import { AuthRequest } from '../../types/auth.types.js';
import prisma from '../../utils/prisma.js';

export const createProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { nombre, descripcion, fechaInicio, fechaFin } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Usuario no identificado' });
      return;
    }

    const nuevoProyecto = await prisma.project.create({
      data: {
        nombre,
        descripcion,
        fechaInicio: fechaInicio ? new Date(fechaInicio) : null,
        fechaFin: fechaFin ? new Date(fechaFin) : null,
        creadoPorId: userId,

        miembros: {
          create: {
            userId: userId,
            rol: 'OWNER'
          }
        }
      }
    });

    res.status(201).json({
      mensaje: 'Proyecto creado exitosamente',
      proyecto: nuevoProyecto
    });
  } catch (error) {
    console.error('Error al crear proyecto:', error);
    res.status(500).json({ error: 'Error al crear el proyecto' });
  }
};

export const getMyProjects = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    const proyectos = await prisma.project.findMany({
      where: {
        miembros: {
          some: { userId }
        }
      },
      include: {
        _count: {
          select: { tareas: true, miembros: true }
        }
      }
    });

    res.status(200).json(proyectos);
  } catch (error) {
    console.error('Error al obtener proyectos:', error);
    res.status(500).json({ error: 'Error al obtener los proyectos' });
  }
};