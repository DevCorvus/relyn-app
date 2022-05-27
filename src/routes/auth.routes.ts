import { Router } from 'express';
import * as authController from '../controllers/auth.controller';

const router = Router();

router.post('/token', authController.refreshToken);
router.post('/csrf', authController.csrfToken);

export const authRoutes = router;
