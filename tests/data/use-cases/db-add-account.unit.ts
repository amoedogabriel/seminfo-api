import { AddAccountRepository } from '../../../src/data/protocols/add-account-repository';
import { DbAddAccount } from '../../../src/data/use-cases/db-add-account';
import { makeFakeAddAccountData } from '../../helper/make-fake-add-account-data';
import { AddAccountRepositoryStub } from '../test/mock-add-account-repository';

type SutTypes = {
  sut: DbAddAccount;
  addAccountRepository: AddAccountRepository;
};

const makeSut = (): SutTypes => {
  const addAccountRepository = new AddAccountRepositoryStub();
  const sut = new DbAddAccount(addAccountRepository);
  return {
    sut,
    addAccountRepository,
  };
};

describe('DbAddAccount', () => {
  it('Should AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepository } = makeSut();
    const addAccountSpy = jest.spyOn(addAccountRepository, 'addAccount');
    await sut.add(makeFakeAddAccountData());
    expect(addAccountSpy).toHaveBeenCalledWith(makeFakeAddAccountData());
  });
});
