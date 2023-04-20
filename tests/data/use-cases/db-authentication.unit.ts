import { LoadAccountByEmailRepository } from '@data/protocols/db';
import { DbAuthentication } from '@data/use-cases';
import { makeFakeAddAccountResult, makeFakeAuthenticationData } from '@tests/helper';
import { EncrypterStub } from '@tests/data/test';
import { Encrypter } from '@data/protocols/cryptography';
import { AccountModel } from '@domain/models';

class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
  async loadByEmail(_email: string): Promise<AccountModel> {
    return Promise.resolve(makeFakeAddAccountResult());
  }
}

type SutTypes = {
  sut: DbAuthentication;
  loadAccountByEmail: LoadAccountByEmailRepository;
  encrypter: Encrypter;
};

const makeSut = (): SutTypes => {
  const loadAccountByEmail = new LoadAccountByEmailRepositoryStub();
  const encrypter = new EncrypterStub();
  const sut = new DbAuthentication(loadAccountByEmail, encrypter);
  return { sut, loadAccountByEmail, encrypter };
};

describe('DbAuthentication', () => {
  it('Should call LoadAccountByEmail with correct values', async () => {
    const { sut, loadAccountByEmail } = makeSut();
    const loadByEmailSpy = jest.spyOn(loadAccountByEmail, 'loadByEmail');
    await sut.auth(makeFakeAuthenticationData());
    expect(loadByEmailSpy).toHaveBeenCalledWith(makeFakeAuthenticationData().email);
  });

  it('Should call Encrypter with correct value', async () => {
    const { sut, encrypter } = makeSut();
    const encryptSpy = jest.spyOn(encrypter, 'encrypt');
    await sut.auth(makeFakeAuthenticationData());
    expect(encryptSpy).toHaveBeenCalledWith('any_id');
  });
});
