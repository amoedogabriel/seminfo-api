import { cors, contentType, bodyParser } from '@main/middleware';
import { Express } from 'express';

export default (app: Express): void => {
  app.use(cors);
  app.use(contentType);
  app.use(bodyParser);
};
