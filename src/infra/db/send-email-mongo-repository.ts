import { SetEmailConfirmationTokenRepository } from '@data/protocols/db/send-email';
import { MongoHelper } from '@infra/helper';
import { randomUUID } from 'crypto';

export class SendEmailMongoRepository implements SetEmailConfirmationTokenRepository {
  async setToken(email: string): Promise<string> {
    const token = randomUUID();
    const accountCollection = await MongoHelper.getCollection('account');
    await accountCollection.updateOne(
      { email },
      {
        $set: {
          confirmationToken: token,
        },
      }
    );
    return token;
  }
}
