import './config/alias';
import { MongoHelper } from '@infra/helper';
import mongoEnv from '@main/config/mongo-env';

MongoHelper.connect(mongoEnv.mongoURL)
  .then(async () => {
    const app = (await import('@main/config/app')).default;
    app.listen(mongoEnv.port, () => {
      console.log(`Server running at port ${mongoEnv.port}.`);
    });
  })
  .catch(console.error);
