import { Express } from 'express';
import { cors } from '../middleware/cors';
import { contentType } from '../middleware/content-type';
import { bodyParser } from '../middleware/body-parser';

export default (app: Express): void => {
  app.use(cors);
  app.use(contentType);
  app.use(bodyParser);
};
