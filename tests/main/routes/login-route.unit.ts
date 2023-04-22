import { MongoHelper } from '@infra/helper';
import app from '@main/config/app';
import mongoEnv from '@main/config/mongo-env';
import { hash } from 'bcrypt';
import { Collection } from 'mongodb';
import request from 'supertest';

let accountCollection: Collection;

describe('Login Route', () => {
  beforeAll(async () => {
    await MongoHelper.connect(mongoEnv.mongoURL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('account');
    accountCollection.deleteMany({});
  });

  it('Should return an access token on success', async () => {
    const password = await hash('@Valid123', 12);
    await accountCollection.insertOne({
      name: 'Breno Gonzaga',
      email: 'any_email@mail.com',
      password,
    });
    const loginAccount = { email: 'any_email@mail.com', password: '@Valid123' };
    await request(app).post('/login').send(loginAccount).expect(200);
  });
});
