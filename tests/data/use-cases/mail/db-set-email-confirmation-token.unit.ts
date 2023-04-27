import { LoadAccountByEmailRepository } from '@data/protocols/db/account';
import { SetEmailConfirmationTokenRepository } from '@data/protocols/db/mail';
import { DbSetEmailConfirmationToken } from '@data/use-cases/mail';
import { AccountModel } from '@domain/models/account';
import { SetEmailConfirmationTokenRepositoryStub } from '@tests/data/test/mail';
import { makeFakeAddAccountResult } from '@tests/helper/account';

export class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
  async loadByEmail(_email: string): Promise<AccountModel> {
    return makeFakeAddAccountResult();
  }
}

type SutTypes = {
  sut: DbSetEmailConfirmationToken;
  loadAccountByEmail: LoadAccountByEmailRepository;
  setEmailConfirmationToken: SetEmailConfirmationTokenRepository;
};

const makeSut = (): SutTypes => {
  const loadAccountByEmail = new LoadAccountByEmailRepositoryStub();
  const setEmailConfirmationToken = new SetEmailConfirmationTokenRepositoryStub();
  const sut = new DbSetEmailConfirmationToken(loadAccountByEmail, setEmailConfirmationToken);
  return { sut, loadAccountByEmail, setEmailConfirmationToken };
};

describe('DbSendEmailConfirmation', () => {
  it('Should call LoadAccountByEmailRepository with correct e-mail', async () => {
    const { sut, loadAccountByEmail } = makeSut();
    const loadByEmailSpy = jest.spyOn(loadAccountByEmail, 'loadByEmail');
    await sut.set('valid_email@mail.com');
    expect(loadByEmailSpy).toHaveBeenCalledWith('valid_email@mail.com');
  });

  it('Should call SetEmailConfirmationTokenRepository with  e-mail', async () => {
    const { sut, loadAccountByEmail } = makeSut();
    const loadByEmailSpy = jest.spyOn(loadAccountByEmail, 'loadByEmail');
    await sut.set('valid_email@mail.com');
    expect(loadByEmailSpy).toHaveBeenCalledWith('valid_email@mail.com');
  });
});
