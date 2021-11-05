import { Router } from "express";
import controller from "../controllers/user.controller";
import {
  validate,
  userValidationRules,
  avatarValidationRules,
  nicknameValidationRules,
  loginValidationRules,
  passwordValidationRules,
  newEmailValidationRules,
  passwordChangeValidationRules,
} from "../middlewares/ValidationRules";
import AuthToken from "../middlewares/AuthToken";
import CsrfProtection from "../middlewares/CsrfProtection";

const router: Router = Router();

router.get("/", controller.index);
router.get("/:username/info", controller.info);
router.post("/", controller.exists);
router.post("/account", [CsrfProtection, AuthToken], controller.account);
router.post("/register", [CsrfProtection, userValidationRules(), validate], controller.store);
router.post("/login", [CsrfProtection, loginValidationRules(), validate], controller.login);
router.post("/logout", [CsrfProtection, AuthToken], controller.logout);
router.put("/avatar", [CsrfProtection, AuthToken], [avatarValidationRules(), validate], controller.changeAvatar);
router.put("/nickname", [CsrfProtection, AuthToken, nicknameValidationRules(), validate], controller.changeNickname);
router.put("/password", [CsrfProtection, AuthToken, passwordChangeValidationRules(), validate], controller.changePassword);
router.put("/email", [CsrfProtection, AuthToken, passwordValidationRules(), newEmailValidationRules(), validate], controller.changeEmail);
// router.put("/", [CsrfProtection, AuthToken, passwordValidationRules(), validate], controller.destroy);

router.post("/:username/follow", [CsrfProtection, AuthToken], controller.follow);
router.post("/:username/unfollow", [CsrfProtection, AuthToken], controller.unfollow);
router.post("/me/follows", [CsrfProtection, AuthToken], controller.followsInfo);

export default router;