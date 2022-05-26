import { Router } from 'express';
import controller from '../controllers/comment.controller';
import AuthToken from '../middlewares/AuthToken';
import CsrfProtection from '../middlewares/CsrfProtection';
import { validate, postValidationRules } from '../middlewares/ValidationRules';

const router: Router = Router();

router.get('/:postId/comments', controller.index);
router.post(
  '/:postId/comments',
  [CsrfProtection, postValidationRules(), validate],
  [AuthToken],
  controller.store
);
router.put(
  '/:id/comments',
  [CsrfProtection, postValidationRules(), validate],
  [AuthToken],
  controller.update
);
router.delete('/:id/comments', [CsrfProtection, AuthToken], controller.destroy);

export default router;
