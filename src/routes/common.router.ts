import { CommonController } from '../controllers';
import { Router } from "express";

const router = Router();

router.get("/", CommonController.healthCheck);

export default router;
