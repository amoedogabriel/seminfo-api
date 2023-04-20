import { LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '@data/protocols/db';
import { DbAuthentication } from '@data/use-cases';
import { makeFakeAddAccountResult, makeFakeAuthenticationData } from '@tests/helper';
import { EncrypterStub, HashCompareStub, UpdateAccessTokenRepositoryStub } from '@tests/data/test';
import { Encrypter, HashCompare } from '@data/protocols/cryptography';
import { AccountModel } from '@domain/models';

class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
  async loadByEmail(_email: string): Promise<AccountModel> {
    return Promise.resolve(makeFakeAddAccountResult());
  }
}

type SutTypes = {
  sut: DbAuthentication;
  loadAccountByEmail: LoadAccountByEmailRepository;
  updateAccessToken: UpdateAccessTokenRepository;
  encrypter: Encrypter;
  hashCompare: HashCompare;
};

const makeSut = (): SutTypes => {
  const loadAccountByEmail = new LoadAccountByEmailRepositoryStub();
  const updateAccessToken = new UpdateAccessTokenRepositoryStub();
  const encrypter = new EncrypterStub();
  const hashCompare = new HashCompareStub();
  const sut = new DbAuthentication(loadAccountByEmail, updateAccessToken, encrypter, hashCompare);
  return { sut, loadAccountByEmail, updateAccessToken, encrypter, hashCompare };
};

describe('DbAuthentication', () => {
  it('Should call LoadAccountByEmail with correct values', async () => {
    const { sut, loadAccountByEmail } = makeSut();
    const loadByEmailSpy = jest.spyOn(loadAccountByEmail, 'loadByEmail');
    await sut.auth(makeFakeAuthenticationData());
    expect(loadByEmailSpy).toHaveBeenCalledWith(makeFakeAuthenticationData().email);
  });

  it('Should throw if LoadAccountByEmail throws', async () => {
    const { sut, loadAccountByEmail } = makeSut();
    jest.spyOn(loadAccountByEmail, 'loadByEmail').mockReturnValueOnce(Promise.reject(new Error()));
    const promise = sut.auth(makeFakeAuthenticationData());
    expect(promise).rejects.toThrow();
  });

  it('Should call return null if LoadAccountByEmail returns null', async () => {
    const { sut, loadAccountByEmail } = makeSut();
    jest.spyOn(loadAccountByEmail, 'loadByEmail').mockReturnValueOnce(null);
    const result = await sut.auth(makeFakeAuthenticationData());
    expect(result).toBeNull();
  });

  it('Should call Encrypter with correct value', async () => {
    const { sut, encrypter } = makeSut();
    const encryptSpy = jest.spyOn(encrypter, 'encrypt');
    await sut.auth(makeFakeAuthenticationData());
    expect(encryptSpy).toHaveBeenCalledWith('any_id');
  });

  it('Should throw if Encrypter throws', async () => {
    const { sut, encrypter } = makeSut();
    jest.spyOn(encrypter, 'encrypt').mockReturnValueOnce(Promise.reject(new Error()));
    const promise = sut.auth(makeFakeAuthenticationData());
    expect(promise).rejects.toThrow();
  });

  it('Should call UpdateAccessToken with correct value', async () => {
    const { sut, updateAccessToken } = makeSut();
    const updateTokenSpy = jest.spyOn(updateAccessToken, 'updateAccessToken');
    await sut.auth(makeFakeAuthenticationData());
    expect(updateTokenSpy).toHaveBeenCalledWith(makeFakeAuthenticationData().email, 'any_token');
  });

  it('Should throw if UpdateAccessToken throws', async () => {
    const { sut, updateAccessToken } = makeSut();
    jest.spyOn(updateAccessToken, 'updateAccessToken').mockReturnValueOnce(Promise.reject(new Error()));
    const promise = sut.auth(makeFakeAuthenticationData());
    expect(promise).rejects.toThrow();
  });

  it('Should call HashCompare with correct values', async () => {
    const { sut, hashCompare } = makeSut();
    const hashCompareSpy = jest.spyOn(hashCompare, 'compare');
    await sut.auth(makeFakeAuthenticationData());
    expect(hashCompareSpy).toHaveBeenCalledWith(makeFakeAuthenticationData().password, 'any_password');
  });

  it('Should throw if HashCompare throws', async () => {
    const { sut, hashCompare } = makeSut();
    jest.spyOn(hashCompare, 'compare').mockReturnValueOnce(Promise.reject(new Error()));
    const promise = sut.auth(makeFakeAuthenticationData());
    expect(promise).rejects.toThrow();
  });
});
