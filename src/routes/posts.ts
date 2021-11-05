import { Router } from "express";
import controller from "../controllers/post.controller";
import AuthToken from "../middlewares/AuthToken";
import CsrfProtection from "../middlewares/CsrfProtection";
import { validate, postValidationRules } from "../middlewares/ValidationRules";

const router: Router = Router();

router.get("/", controller.index);
router.get("/:id", controller.show);
router.post("/", [CsrfProtection, AuthToken, postValidationRules(), validate], controller.store);
router.put("/:id", [CsrfProtection, AuthToken, postValidationRules(), validate], controller.update);
router.delete("/:id", [CsrfProtection, AuthToken], controller.destroy);

router.post("/:id/like", [CsrfProtection, AuthToken], controller.like);

export default router;