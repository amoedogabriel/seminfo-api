import { LoadAccountByEmailRepository } from '@data/protocols/db';
import { DbAuthentication } from '@data/use-cases';
import { makeFakeAuthenticationData } from '@tests/helper';
import { LoadAccountByEmailRepositoryStub } from '@tests/data/test';

type SutTypes = {
  sut: DbAuthentication;
  loadAccountByEmail: LoadAccountByEmailRepository;
};

const makeSut = (): SutTypes => {
  const loadAccountByEmail = new LoadAccountByEmailRepositoryStub();
  const sut = new DbAuthentication(loadAccountByEmail);
  return { sut, loadAccountByEmail };
};

describe('DbAuthentication', () => {
  it('Should LoadAccountByEmail with correct values', async () => {
    const { sut, loadAccountByEmail } = makeSut();
    const loadByEmailSpy = jest.spyOn(loadAccountByEmail, 'loadByEmail');
    await sut.auth(makeFakeAuthenticationData());
    expect(loadByEmailSpy).toHaveBeenCalledWith(makeFakeAuthenticationData().email);
  });
});
