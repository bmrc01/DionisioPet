import { Router } from 'express';
import petRouter from './pets';
import vacinaRouter from './vacina';

const router = Router();

router.use('/', petRouter);
router.use('/', vacinaRouter);

export default router;
