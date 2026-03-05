import { Router } from 'express';
import { register, login } from './auth.controller.js';
import { validateSchema } from '../../middlewares/validator.middleware.js';
import { registerSchema, loginSchema } from './auth.schema.js';

const router = Router();

router.post('/register', validateSchema(registerSchema), register);
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo
 *               - password
 *             properties:
 *               correo:
 *                 type: string
 *                 format: email
 *                 example: alfredo@ejemplo.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: MiPasswordSeguro123
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve el token JWT
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Credenciales incorrectas
 */
router.post('/login', validateSchema(loginSchema), login);

export default router;