import { Express, Router } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';

export default (app: Express): void => {
  const router = Router();
  app.use('/', router);

  readdirSync(join(__dirname, '..', 'routes'), { withFileTypes: true }).forEach(async (file) => {
    if (file.isDirectory()) {
      readdirSync(join(__dirname, '..', 'routes', file.name)).forEach(async (nestedFile) => {
        if (!nestedFile.includes('.map')) {
          (await import(join(__dirname, '..', 'routes', file.name, nestedFile))).default(router);
        }
      });
    } else if (!file.name.includes('.map')) {
      (await import(join(__dirname, '..', 'routes', file.name))).default(router);
    }
  });
};
