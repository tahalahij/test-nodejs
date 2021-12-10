import { Router } from "express";
import { ProfileController } from '../controllers';
import Validators from '../validators';

const router = Router();

router.get("/",
    Validators.getProfiles,
    ProfileController.getProfiles);

router.post("/",
    Validators.createProfile,
    ProfileController.createProfile);

router.get("/:id/simulators",
    Validators.getProfileSimulators,
    ProfileController.getProfileSimulators);

export default router;

