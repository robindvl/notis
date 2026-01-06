import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { USER_ROUTES } from '@repo/domain';

const router: Router = Router();

router.get(USER_ROUTES.BASE, userController.list);
router.get(USER_ROUTES.BY_ID, userController.getById);

export default router;

