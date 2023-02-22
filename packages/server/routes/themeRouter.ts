import { Router } from 'express';
import { ThemeController } from '../controllers/themeController';

const themeRouter = Router({ mergeParams: true });

themeRouter
  .route('/')
    .post(ThemeController.create)
    .put(ThemeController.update)

themeRouter
  .route('/:id')
    .get(ThemeController.request)
    
export { themeRouter };
