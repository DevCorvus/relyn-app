import { Router } from 'express';
import * as commentController from '../controllers/comment.controller';

import { authToken } from '../middlewares/authToken';
import { csrfProtection } from '../middlewares/csrfProtection';
import { validate, postValidationRules } from '../middlewares/expressValidator';

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
