import { Router } from "express";
import controller from "../controllers/auth.controller";

const router: Router = Router();

router.post("/token", controller.refreshToken);
router.post("/csrf", controller.csrfToken);

export default router;