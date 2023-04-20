import './config/alias';
import { MongoHelper } from '@infra/helper';
import env from '@main/config/env';

MongoHelper.connect(env.mongoURL)
  .then(async () => {
    const app = (await import('@main/config/app')).default;
    app.listen(env.port, () => {
      console.log(`Server running at port ${env.port}.`);
    });
  })
  .catch(console.error);
