import { LoadAccountByEmailRepository } from '@data/protocols/db/account';
import { SendEmailConfirmationRepository } from '@data/protocols/db/account/send-email-confirmation-repository';
import { SetEmailConfirmationTokenRepository } from '@data/protocols/db/send-email';
import { DbSendEmailConfirmation } from '@data/use-cases/mail';
import { AccountModel } from '@domain/models/account';
import {
  SendEmailConfirmationStub,
  SetEmailConfirmationTokenRepositoryStub,
} from '@tests/data/test/send-email';
import { makeFakeAddAccountResult } from '@tests/helper';

export class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
  async loadByEmail(_email: string): Promise<AccountModel> {
    return makeFakeAddAccountResult();
  }
}

type SutTypes = {
  sut: DbSendEmailConfirmation;
  loadAccountByEmail: LoadAccountByEmailRepository;
  setEmailConfirmationToken: SetEmailConfirmationTokenRepository;
  sendEmailConfirmation: SendEmailConfirmationRepository;
};

const makeSut = (): SutTypes => {
  const loadAccountByEmail = new LoadAccountByEmailRepositoryStub();
  const setEmailConfirmationToken = new SetEmailConfirmationTokenRepositoryStub();
  const sendEmailConfirmation = new SendEmailConfirmationStub();
  const sut = new DbSendEmailConfirmation(
    loadAccountByEmail,
    setEmailConfirmationToken,
    sendEmailConfirmation
  );
  return { sut, loadAccountByEmail, setEmailConfirmationToken, sendEmailConfirmation };
};

describe('DbSendEmailConfirmation', () => {
  it('Should call LoadAccountByEmailRepository with correct e-mail', async () => {
    const { sut, loadAccountByEmail } = makeSut();
    const loadByEmailSpy = jest.spyOn(loadAccountByEmail, 'loadByEmail');
    await sut.send('valid_email@mail.com');
    expect(loadByEmailSpy).toHaveBeenCalledWith('valid_email@mail.com');
  });

  it('Should call SetEmailConfirmationTokenRepository with  e-mail', async () => {
    const { sut, loadAccountByEmail } = makeSut();
    const loadByEmailSpy = jest.spyOn(loadAccountByEmail, 'loadByEmail');
    await sut.send('valid_email@mail.com');
    expect(loadByEmailSpy).toHaveBeenCalledWith('valid_email@mail.com');
  });

  it('Should call SendEmailConfirmationRepository correct values', async () => {
    const { sut, sendEmailConfirmation } = makeSut();
    const sendConfirmationSpy = jest.spyOn(sendEmailConfirmation, 'sendEmail');
    await sut.send('valid_email@mail.com');
    expect(sendConfirmationSpy).toHaveBeenCalledWith('valid_email@mail.com', 'confirmation_token');
  });

  it('Should not call SendEmailConfirmationRepository if account returns null', async () => {
    const { sut, loadAccountByEmail, sendEmailConfirmation } = makeSut();
    jest.spyOn(loadAccountByEmail, 'loadByEmail').mockReturnValueOnce(null);
    const sendEmailSpy = jest.spyOn(sendEmailConfirmation, 'sendEmail');
    await sut.send('valid_email@mail.com');
    expect(sendEmailSpy).not.toHaveBeenCalled();
  });
});
