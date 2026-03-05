import { Router } from 'express';
import { register, login } from './auth.controller.js';
import { validateSchema } from '../../middlewares/validator.middleware.js';
import { registerSchema, loginSchema } from './auth.schema.js';

const router = Router();

router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);

export default router;