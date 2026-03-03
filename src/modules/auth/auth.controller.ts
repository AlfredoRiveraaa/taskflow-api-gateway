import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../../utils/prisma.js';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, correo, password } = req.body;

    // 1. Validar que el usuario no exista previamente
    const usuarioExistente = await prisma.user.findUnique({
      where: { correo }
    });

    if (usuarioExistente) {
      res.status(400).json({ error: 'El correo ya está registrado' });
      return;
    }

    // 2. Hashear (cifrar) la contraseña
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 3. Guardar el nuevo usuario en la base de datos
    const nuevoUsuario = await prisma.user.create({
      data: {
        nombre,
        correo,
        passwordHash
      }
    });

    // 4. Responder sin enviar la contraseña de vuelta (por seguridad)
    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        correo: nuevoUsuario.correo
      }
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { correo, password } = req.body;

    // 1. Buscar al usuario
    const usuario = await prisma.user.findUnique({ where: { correo } });
    if (!usuario) {
      res.status(401).json({ error: 'Credenciales inválidas' });
      return;
    }

    // 2. Verificar contraseña
    const passwordValida = await bcrypt.compare(password, usuario.passwordHash);
    if (!passwordValida) {
      res.status(401).json({ error: 'Credenciales inválidas' });
      return;
    }

    // 3. Generar el Token JWT
    const token = jwt.sign(
      { userId: usuario.id, correo: usuario.correo },
      process.env.JWT_SECRET as string,
      { expiresIn: '8h' } // El token expira en 8 horas
    );

    // 4. Responder con el token
    res.status(200).json({
      mensaje: 'Inicio de sesión exitoso',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};