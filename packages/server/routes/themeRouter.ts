import { Router } from 'express';
import { ThemeController } from '../controllers/themeController';

const themeRouter = Router({ mergeParams: true });

themeRouter
  .route('/:id')
    .get(ThemeController.request)
    .post(ThemeController.create)
    .put(ThemeController.update)
    
export { themeRouter };
