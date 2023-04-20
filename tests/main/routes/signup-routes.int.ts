import { MongoHelper } from '@infra/helper';
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
    const account = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: '@Valid123',
      passwordConfirmation: '@Valid123',
    };
    await request(app).post('/signup').send(account).expect(200);
  });
});
