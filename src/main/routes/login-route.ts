import { adapterRoute } from '@main/express/express-route-adapter';
import { makeLoginFactory } from '@main/factories/login';
import { Router } from 'express';

export default (router: Router): void => {
  router.post('/login', adapterRoute(makeLoginFactory()));
};
