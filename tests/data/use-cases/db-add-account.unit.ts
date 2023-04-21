import { Hasher } from '@data/protocols/cryptography';
import { AddAccountRepository, LoadAccountByEmailRepository } from '@data/protocols/db/account';
import { DbAddAccount } from '@data/use-cases/account';
import { makeFakeAddAccountData, makeFakeAddAccountResult } from '@tests/helper';
import { HasherStub, AddAccountRepositoryStub, LoadAccountByEmailRepositoryStub } from '@tests/data/test';

type SutTypes = {
  sut: DbAddAccount;
  hasher: Hasher;
  addAccountRepository: AddAccountRepository;
  loadAccountByEmail: LoadAccountByEmailRepository;
};

const makeSut = (): SutTypes => {
  const hasher = new HasherStub();
  const addAccountRepository = new AddAccountRepositoryStub();
  const loadAccountByEmail = new LoadAccountByEmailRepositoryStub();
  const sut = new DbAddAccount(hasher, addAccountRepository, loadAccountByEmail);
  return {
    sut,
    addAccountRepository,
    hasher,
    loadAccountByEmail,
  };
};

describe('DbAddAccount', () => {
  it('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepository } = makeSut();
    const addAccountSpy = jest.spyOn(addAccountRepository, 'addAccount');
    await sut.add(makeFakeAddAccountData());
    expect(addAccountSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password',
    });
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

  it('Should call LoadAccountByEmail with correct e-mail', async () => {
    const { sut, loadAccountByEmail } = makeSut();
    const loadAccountSpy = jest.spyOn(loadAccountByEmail, 'loadByEmail');
    await sut.add(makeFakeAddAccountData());
    expect(loadAccountSpy).toHaveBeenCalledWith(makeFakeAddAccountData().email);
  });

  it('Should return null if LoadAccountByEmail returns an account', async () => {
    const { sut, loadAccountByEmail } = makeSut();
    jest
      .spyOn(loadAccountByEmail, 'loadByEmail')
      .mockReturnValueOnce(Promise.resolve(makeFakeAddAccountResult()));
    const account = await sut.add(makeFakeAddAccountData());
    expect(account).toBeNull();
  });
});
