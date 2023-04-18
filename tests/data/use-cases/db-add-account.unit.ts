import { Hasher } from '../../../src/data/protocols/cryptography/hasher';
import { AddAccountRepository } from '../../../src/data/protocols/db/add-account-repository';
import { DbAddAccount } from '../../../src/data/use-cases/db-add-account';
import { makeFakeAddAccountData } from '../../helper/make-fake-add-account-data';
import { makeFakeAddAccountResult } from '../../helper/make-fake-add-account-result';
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

  it('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepository } = makeSut();
    jest.spyOn(addAccountRepository, 'addAccount').mockReturnValueOnce(Promise.reject(new Error()));
    const promise = sut.add(makeFakeAddAccountData());
    expect(promise).rejects.toThrow();
  });

  it('Should call Hasher with correct password', async () => {
    const { sut, hasher } = makeSut();
    const hashSpy = jest.spyOn(hasher, 'hash');
    await sut.add(makeFakeAddAccountData());
    expect(hashSpy).toHaveBeenCalledWith(makeFakeAddAccountData().password);
  });

  it('Should throw if Hasher throws', async () => {
    const { sut, hasher } = makeSut();
    jest.spyOn(hasher, 'hash').mockReturnValueOnce(Promise.reject(new Error()));
    const promise = sut.add(makeFakeAddAccountData());
    expect(promise).rejects.toThrow();
  });

  it('Should return an account on success ', async () => {
    const { sut, addAccountRepository } = makeSut();
    jest
      .spyOn(addAccountRepository, 'addAccount')
      .mockReturnValueOnce(Promise.resolve(makeFakeAddAccountResult()));
    const accountData = makeFakeAddAccountData();
    const accountResult = await sut.add(accountData);
    expect(accountResult).toBeTruthy();
    expect(accountResult.id).toBeTruthy();
    expect(accountResult.name).toBe(accountData.name);
    expect(accountResult.email).toBe(accountData.email);
    expect(accountResult.password).toBe(accountData.password);
  });
});
