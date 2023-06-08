import { Router } from 'express';
import { Request, Response } from 'express';
import emailController from '../controllers/emailController';

const router = Router();

router
  .route('/email')
  .post((req: Request, res: Response) => emailController.sendEmail(req, res));

export default router;
