import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { AUTH_ROUTES } from '@repo/domain';

const router: Router = Router();

router.post(AUTH_ROUTES.REGISTER, authController.register);
router.post(AUTH_ROUTES.LOGIN, authController.login);
router.get(AUTH_ROUTES.VALIDATE, authController.validate);

export default router;

