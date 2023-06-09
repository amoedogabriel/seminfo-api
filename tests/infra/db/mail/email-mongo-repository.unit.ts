import { EmailMongoRepository } from '@infra/db/mail';
import { MongoHelper } from '@infra/helper';
import { makeFakeAddAccountData } from '@tests/helper/account';
import { Collection } from 'mongodb';

let accountCollection: Collection;

describe('SendEmailMongoRepository', () => {
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

  it('Should return a valid confirmation token on setToken', async () => {
    const sut = new EmailMongoRepository();
    const accountData = makeFakeAddAccountData();
    const accountId = await accountCollection.insertOne(accountData).then((data) => data.insertedId);
    const token = await sut.setToken('any_email@mail.com');
    const account = await accountCollection.findOne(accountId);
    expect(account.confirmationToken).toEqual(token);
    expect(account.expirationToken).toBeTruthy();
  });

  it('Should confirm email on activated true', async () => {
    const sut = new EmailMongoRepository();
    const accountData = makeFakeAddAccountData();
    const accountId = await accountCollection.insertOne(accountData).then((data) => data.insertedId);
    await sut.setToken('any_email@mail.com');
    await accountCollection.updateOne(
      { email: 'any_email@mail.com' },
      {
        $set: {
          activated: true,
        },
      }
    );
    const account = await accountCollection.findOne(accountId);
    expect(account.activated).toEqual(true);
  });
});
