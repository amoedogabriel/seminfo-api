import { SetEmailConfirmationTokenRepository } from '@data/protocols/db/mail';
import { MongoHelper } from '@infra/helper';
import { randomUUID } from 'crypto';

export class EmailMongoRepository implements SetEmailConfirmationTokenRepository {
  async setToken(email: string): Promise<string> {
    const token = randomUUID();
    const now = new Date();
    const expirationToken = now.setHours(now.getHours()) + 1;
    const accountCollection = await MongoHelper.getCollection('account');
    await accountCollection.updateOne(
      { email },
      {
        $set: {
          confirmationToken: token,
          expirationToken,
        },
      }
    );
    return token;
  }
}
