import { MongoHelper } from '../../../src/infra/helper/mongo-helper';

describe('Mongo Helper', () => {
  const sut = MongoHelper;
  beforeAll(async () => {
    await MongoHelper.connect('mongodb://root:root@localhost:27017/');
  });

  afterAll(async () => {
    await sut.disconnect();
  });

  it('Should reconnect if mongodb is down', async () => {
    let accountCollection = await sut.getCollection('account');
    expect(accountCollection).toBeTruthy();
    await sut.disconnect();
    accountCollection = await sut.getCollection('account');
    expect(accountCollection).toBeTruthy();
  });
});
