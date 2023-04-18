import { MongoHelper } from '../infra/helper/mongo-helper';
import env from './config/env';

MongoHelper.connect(env.mongoURL)
  .then(async () => {
    const app = (await import('./config/app')).default;
    app.listen(env.port, () => {
      console.log(`Server running at port ${env.port}.`);
    });
  })
  .catch(console.error);
