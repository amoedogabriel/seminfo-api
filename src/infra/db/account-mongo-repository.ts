import { AddAccountRepository } from '@data/protocols/db';
import { LoadAccountByEmailRepository } from '@data/protocols/db/load-account-by-email-repository';
import { AddAccountModel, AccountModel } from '@domain/models';
import { MongoHelper } from '@infra/helper';

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
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
}
