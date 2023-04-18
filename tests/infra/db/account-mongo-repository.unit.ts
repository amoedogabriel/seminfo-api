import { AccountMongoRepository } from '@infra/db';
import { MongoHelper } from '@infra/helper';
import { makeFakeAddAccountData } from '@tests/helper/make-fake-add-account-data';
import { Collection } from 'mongodb';

let accountCollection: Collection;

describe('AccountMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect('mongodb://root:root@localhost:27017/');
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts');
    accountCollection.deleteMany({});
  });

  it('Should return an account on add account success', async () => {
    const sut = new AccountMongoRepository();
    const accountData = makeFakeAddAccountData();
    const account = await sut.addAccount(accountData);
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toEqual(accountData.name);
    expect(account.email).toEqual(account.email);
    expect(account.password).toEqual(account.password);
  });
});
