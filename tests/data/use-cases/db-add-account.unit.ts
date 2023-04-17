import { Hasher } from '../../../src/data/protocols/cryptography/hasher';
import { AddAccountRepository } from '../../../src/data/protocols/db/add-account-repository';
import { DbAddAccount } from '../../../src/data/use-cases/db-add-account';
import { makeFakeAddAccountData } from '../../helper/make-fake-add-account-data';
import { AddAccountRepositoryStub } from '../test/mock-add-account-repository';
import { HasherStub } from '../test/mock-hasher';

type SutTypes = {
  sut: DbAddAccount;
  hasher: Hasher;
  addAccountRepository: AddAccountRepository;
};

const makeSut = (): SutTypes => {
  const hasher = new HasherStub();
  const addAccountRepository = new AddAccountRepositoryStub();
  const sut = new DbAddAccount(hasher, addAccountRepository);
  return {
    sut,
    addAccountRepository,
    hasher,
  };
};

describe('DbAddAccount', () => {
  it('Should AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepository } = makeSut();
    const addAccountSpy = jest.spyOn(addAccountRepository, 'addAccount');
    await sut.add(makeFakeAddAccountData());
    expect(addAccountSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password',
    });
  });

  it('Should call Hasher with correct password', async () => {
    const { sut, hasher } = makeSut();
    const hashSpy = jest.spyOn(hasher, 'hash');
    await sut.add(makeFakeAddAccountData());
    expect(hashSpy).toHaveBeenCalledWith(makeFakeAddAccountData().password);
  });
});
