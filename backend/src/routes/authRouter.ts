// Third party imports
import { Router } from "express";

// User imports
import { signup } from "../controllers/authController.js";

const router: Router = Router();

router.post("/signup", signup);

export default router;
