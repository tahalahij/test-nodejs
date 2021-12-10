import { Router } from "express";
import { FavoriteController } from '../controllers';
import Validators from '../validators';

const router = Router();

router.get("/",
    Validators.getFavorites,
    FavoriteController.getFavorites);

router.get("/:id",
    Validators.getFavorite,
    FavoriteController.getFavorite)

export default router;
