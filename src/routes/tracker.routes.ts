import express from 'express';
import { calculateTracker } from '../controllers/tracker.controller';

const router = express.Router();

router.post('/calculate', calculateTracker);

export default router;