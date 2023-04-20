import { AccountMongoRepository } from '@infra/db';
import { MongoHelper } from '@infra/helper';
import { makeFakeAddAccountData } from '@tests/helper';
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
    accountCollection = await MongoHelper.getCollection('account');
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

  it('Should return an account on load by email success', async () => {
    const sut = new AccountMongoRepository();
    const accountData = makeFakeAddAccountData();
    await sut.addAccount(accountData);
    const account = await sut.loadByEmail(accountData.email);
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toEqual(accountData.name);
    expect(account.email).toEqual(account.email);
    expect(account.password).toEqual(account.password);
  });

  it('Should return null if loadByEmail fails', async () => {
    const sut = new AccountMongoRepository();
    const account = await sut.loadByEmail('valid_email@mail.com');
    expect(account).toBeNull();
  });
});
