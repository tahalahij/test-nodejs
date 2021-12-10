import { Router } from 'express';
import favoriteRoutes from './favorite.router';
import profileRoutes from './profile.router';
import simulatorsRoutes from './simulator.router';
import commonRoutes from './common.router';

const router = Router();

router.use('/check', commonRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/profiles', profileRoutes);
router.use('/simulators', simulatorsRoutes);

export default router;
