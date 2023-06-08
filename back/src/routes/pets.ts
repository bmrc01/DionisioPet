import { Router } from 'express';
import { Request, Response } from 'express';
import petController from '../controllers/petController';

const router = Router();

router
  .route('/pets')
  .post((req: Request, res: Response) => petController.create(req, res));

router
  .route('/pets')
  .get((req: Request, res: Response) => petController.getAll(req, res));

router
  .route('/pets/:id')
  .get((req: Request, res: Response) => petController.get(req, res));

router
  .route('/pets/:id')
  .delete((req: Request, res: Response) => petController.delete(req, res));

router
  .route('/pets/:id')
  .put((req: Request, res: Response) => petController.update(req, res));

export default router;
