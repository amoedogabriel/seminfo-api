import { adapterRoute } from '@main/express/express-route-adapter';
import { makeSignupController } from '@main/factories/signup/signup-factory';
import { Router } from 'express';

export default (router: Router): void => {
  router.post('/signup', adapterRoute(makeSignupController()));
};
