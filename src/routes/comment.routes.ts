import { Router } from 'express';
import * as commentController from '../controllers/comment.controller';

import { authToken } from '../middlewares/authToken.middleware';
import { csrfProtection } from '../middlewares/csrfProtection.middleware';
import {
  validate,
  postValidationRules,
} from '../middlewares/validation.middleware';

const router = Router();

router.get('/:postId/comments', commentController.index);
router.post(
  '/:postId/comments',
  [csrfProtection, postValidationRules(), validate],
  [authToken],
  commentController.store
);
router.put(
  '/:id/comments',
  [csrfProtection, postValidationRules(), validate],
  [authToken],
  commentController.update
);
router.delete(
  '/:id/comments',
  [csrfProtection, authToken],
  commentController.destroy
);

export const commentRoutes = router;
