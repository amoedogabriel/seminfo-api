import { AddAccountRepository } from '@data/protocols/db';
import { AddAccountModel, AccountModel } from '@domain/models';
import { MongoHelper } from '@infra/helper';

export class AccountMongoRepository implements AddAccountRepository {
  async addAccount(account: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('account');
    const accountid = await accountCollection.insertOne(account).then((data) => data.insertedId);
    const findAccount = await accountCollection.findOne(accountid);
    return findAccount && MongoHelper.standardizeId(findAccount);
  }
}
