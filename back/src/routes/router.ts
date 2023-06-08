import { Router } from 'express';
import petRouter from './pets';
import vacinaRouter from './vacina';
import emailRouter from './email';

const router = Router();

router.use('/', petRouter);
router.use('/', vacinaRouter);
router.use('/', emailRouter);

export default router;
