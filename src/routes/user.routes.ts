import { Router } from 'express';
import * as userController from '../controllers/user.controller';

import { authToken } from '../middlewares/authToken';
import { csrfProtection } from '../middlewares/csrfProtection';
import {
  validate,
  userValidationRules,
  avatarValidationRules,
  nicknameValidationRules,
  loginValidationRules,
  passwordValidationRules,
  newEmailValidationRules,
  passwordChangeValidationRules,
} from '../middlewares/expressValidator';

const router = Router();

router.get('/', userController.index);
router.get('/:username/info', userController.info);
router.post('/', userController.exists);
router.post('/account', [csrfProtection, authToken], userController.account);
router.post(
  '/register',
  [csrfProtection, userValidationRules(), validate],
  userController.store
);
router.post(
  '/login',
  [csrfProtection, loginValidationRules(), validate],
  userController.login
);
router.post('/logout', [csrfProtection, authToken], userController.logout);
router.put(
  '/avatar',
  [csrfProtection, authToken],
  [avatarValidationRules(), validate],
  userController.changeAvatar
);
router.put(
  '/nickname',
  [csrfProtection, authToken, nicknameValidationRules(), validate],
  userController.changeNickname
);
router.put(
  '/password',
  [csrfProtection, authToken, passwordChangeValidationRules(), validate],
  userController.changePassword
);
router.put(
  '/email',
  [
    csrfProtection,
    authToken,
    passwordValidationRules(),
    newEmailValidationRules(),
    validate,
  ],
  userController.changeEmail
);
// router.put("/", [csrfProtection, authToken, passwordValidationRules(), validate], controller.destroy);

router.post(
  '/:username/follow',
  [csrfProtection, authToken],
  userController.follow
);
router.post(
  '/:username/unfollow',
  [csrfProtection, authToken],
  userController.unfollow
);
router.post(
  '/me/follows',
  [csrfProtection, authToken],
  userController.followsInfo
);

export const userRoutes = router;
