import { Router } from 'express';
import * as userController from '../controllers/user.controller';

const router: Router = Router();

router.get('/', userController.list);
router.get('/:id', userController.getById);

export default router;

