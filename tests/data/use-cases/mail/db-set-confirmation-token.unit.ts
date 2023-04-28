import { LoadAccountByEmailRepository } from '@data/protocols/db/account';
import { SetConfirmationTokenRepository } from '@data/protocols/db/mail';
import { DbSetToken } from '@data/use-cases/mail';
import { AccountModel } from '@domain/models/account';
import { SetEmailConfirmationTokenRepositoryStub } from '@tests/data/test/mail';
import { makeFakeAddAccountResult } from '@tests/helper/account';

export class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
  async loadByEmail(_email: string): Promise<AccountModel> {
    return makeFakeAddAccountResult();
  }
}

type SutTypes = {
  sut: DbSetToken;
  loadAccountByEmail: LoadAccountByEmailRepository;
  setConfirmationToken: SetConfirmationTokenRepository;
};

const makeSut = (): SutTypes => {
  const loadAccountByEmail = new LoadAccountByEmailRepositoryStub();
  const setEmailConfirmationToken = new SetEmailConfirmationTokenRepositoryStub();
  const sut = new DbSetToken(loadAccountByEmail, setEmailConfirmationToken);
  return { sut, loadAccountByEmail, setConfirmationToken: setEmailConfirmationToken };
};

describe('DbSendEmailConfirmation', () => {
  it('Should call LoadAccountByEmailRepository with correct e-mail', async () => {
    const { sut, loadAccountByEmail } = makeSut();
    const loadByEmailSpy = jest.spyOn(loadAccountByEmail, 'loadByEmail');
    await sut.set('valid_email@mail.com');
    expect(loadByEmailSpy).toHaveBeenCalledWith('valid_email@mail.com');
  });

  it('Should call SetConfirmationTokenRepository with  e-mail', async () => {
    const { sut, loadAccountByEmail } = makeSut();
    const loadByEmailSpy = jest.spyOn(loadAccountByEmail, 'loadByEmail');
    await sut.set('valid_email@mail.com');
    expect(loadByEmailSpy).toHaveBeenCalledWith('valid_email@mail.com');
  });
});
