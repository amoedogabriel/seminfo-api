import {
  AddAccountRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
} from '@data/protocols/db';
import { AddAccountModel, AccountModel } from '@domain/models';
import { MongoHelper } from '@infra/helper';

export class AccountMongoRepository
  implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository
{
  async addAccount(account: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('account');
    const accountid = await accountCollection.insertOne(account).then((data) => data.insertedId);
    const findAccount = await accountCollection.findOne(accountid);
    return findAccount && MongoHelper.standardizeId(findAccount);
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('account');
    const findAccount = await accountCollection.findOne({ email });
    return findAccount && MongoHelper.standardizeId(findAccount);
  }

  async updateAccessToken(email: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('account');
    await accountCollection.updateOne(
      { email },
      {
        $set: {
          accessToken: token,
        },
      }
    );
  }
}
