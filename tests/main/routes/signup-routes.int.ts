import { MongoHelper } from '@infra/helper';
import { makeFakeAddAccountData } from '@tests/helper/make-fake-add-account-data';
import app from '@main/config/app';
import env from '@main/config/env';
import { Collection } from 'mongodb';
import request from 'supertest';

let accountCollection: Collection;

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoURL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });
  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('account');
    accountCollection.deleteMany({});
  });
  it('Should return an account on success', async () => {
    const account = makeFakeAddAccountData();
    await request(app).post('/signup').send(account).expect(200);
  });
});
