import { z } from 'zod';

export const registerSchema = z.object({
  nombre: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  correo: z.email({ message: 'Debe ser un correo electrónico válido' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
});

export const loginSchema = z.object({
  correo: z.email({ message: 'Debe ser un correo electrónico válido' }),
  password: z.string().min(1, { message: 'La contraseña es obligatoria' })
});