import { Router } from "express";
import { SimulatorController } from '../controllers';
import Validators from '../validators';

const router = Router();

router.get("/",
    Validators.getSimulators,
    SimulatorController.getSimulators);

router.post("/",
    Validators.createSimulator,
    SimulatorController.createSimulator);

export default router;
