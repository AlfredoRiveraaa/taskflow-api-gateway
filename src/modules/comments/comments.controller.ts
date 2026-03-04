import { Response } from 'express';
import { AuthRequest } from '../../types/auth.types.js';
import prisma from '../../utils/prisma.js';

export const addComment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { taskId, texto } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Usuario no identificado' });
      return;
    }

    if (!taskId || !texto) {
      res.status(400).json({ error: 'El ID de la tarea y el texto son obligatorios' });
      return;
    }

    const nuevoComentario = await prisma.comment.create({
      data: {
        taskId,
        autorId: userId,
        texto
      },
      include: {
        autor: {
          select: { nombre: true, correo: true } 
        }
      }
    });

    res.status(201).json({
      mensaje: 'Comentario agregado exitosamente',
      comentario: nuevoComentario
    });
  } catch (error) {
    console.error('Error al agregar comentario:', error);
    res.status(500).json({ error: 'Error al agregar el comentario' });
  }
};

export const getCommentsByTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { taskId } = req.params;

    const comentarios = await prisma.comment.findMany({
      where: { taskId: taskId as string },
      orderBy: { creadoEn: 'desc' },
      include: {
        autor: {
          select: { id: true, nombre: true, fotoPerfil: true }
        }
      }
    });

    res.status(200).json(comentarios);
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    res.status(500).json({ error: 'Error al obtener los comentarios' });
  }
};