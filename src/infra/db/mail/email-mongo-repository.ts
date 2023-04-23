import { ConfirmEmailRepository, SetEmailConfirmationTokenRepository } from '@data/protocols/db/mail';
import { MongoHelper } from '@infra/helper';
import { randomUUID } from 'crypto';

export class EmailMongoRepository implements SetEmailConfirmationTokenRepository, ConfirmEmailRepository {
  async setToken(email: string): Promise<string> {
    const confirmationToken = randomUUID();
    const now = new Date();
    const expirationToken = now.setHours(now.getHours()) + 1;
    const accountCollection = await MongoHelper.getCollection('account');
    await accountCollection.updateOne(
      { email },
      {
        $set: {
          confirmationToken,
          expirationToken,
        },
      }
    );
    return confirmationToken;
  }

  async confirmEmail(email: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('account');
    await accountCollection.updateOne(
      { email },
      {
        $set: {
          activated: true,
        },
      }
    );
  }
}
