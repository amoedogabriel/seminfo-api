import { Collection } from 'mongodb';
import { MongoHelper } from '../../../src/infra/helper/mongo-helper';
import { makeFakeAddAccountData } from '../../helper/make-fake-add-account-data';
import env from '../../../src/main/config/env';
import app from '../../../src/main/config/app';
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
