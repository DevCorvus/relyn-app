import { Router } from 'express';
import * as postController from '../controllers/post.controller';

import { authToken } from '../middlewares/authToken.middleware';
import { csrfProtection } from '../middlewares/csrfProtection.middleware';
import {
  validate,
  postValidationRules,
} from '../middlewares/validation.middleware';

const router = Router();

router.get('/', postController.index);
router.get('/:id', postController.show);
router.post(
  '/',
  [csrfProtection, authToken, postValidationRules(), validate],
  postController.store
);
router.put(
  '/:id',
  [csrfProtection, authToken, postValidationRules(), validate],
  postController.update
);
router.delete('/:id', [csrfProtection, authToken], postController.destroy);

router.post('/:id/like', [csrfProtection, authToken], postController.like);

export const postRoutes = router;
