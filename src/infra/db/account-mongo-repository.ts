import { AddAccountRepository } from '../../data/protocols/db/add-account-repository';
import { AccountModel } from '../../domain/models/account';
import { AddAccountModel } from '../../domain/models/add-account';
import { MongoHelper } from '../helper/mongo-helper';

export class AccountMongoRepository implements AddAccountRepository {
  async addAccount(account: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('account');
    const accountid = await accountCollection.insertOne(account).then((data) => data.insertedId);
    const findAccount = await accountCollection.findOne(accountid);
    return findAccount && MongoHelper.standardizeId(findAccount);
  }
}
