import { Router } from 'express';
const routes = new Router();
import authMiddlewares from './app/middlewares/auth'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController';

routes.post('/users',UserController.store)
routes.post('/sessions',SessionController.store)
routes.use(authMiddlewares)
routes.put('/updates',UserController.update)

export default routes;
