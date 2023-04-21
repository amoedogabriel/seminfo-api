import { LoadAccountByEmailRepository } from '@data/protocols/db/account';
import { SendEmailConfirmationRepository } from '@data/protocols/db/account/send-email-confirmation-repository';
import { DbSendEmailConfirmation } from '@data/use-cases/account/db-send-email-confirmation';
import { LoadAccountByEmailRepositoryStub } from '@tests/data/test';
import { SendEmailConfirmationStub } from '@tests/data/test/send-email';

type SutTypes = {
  sut: DbSendEmailConfirmation;
  sendEmailConfirmation: SendEmailConfirmationRepository;
  loadAccountByEmail: LoadAccountByEmailRepository;
};

const makeSut = (): SutTypes => {
  const loadAccountByEmail = new LoadAccountByEmailRepositoryStub();
  const sendEmailConfirmation = new SendEmailConfirmationStub();
  const sut = new DbSendEmailConfirmation(loadAccountByEmail, sendEmailConfirmation);
  return { sut, loadAccountByEmail, sendEmailConfirmation };
};

describe('DbSendEmailConfirmation', () => {
  it('Should call Load with correct values', async () => {
    const { sut, sendEmailConfirmation } = makeSut();
    const sendEmailData = { email: 'valid_email@mail.com', token: 'valid_token', body: {} };
    const sendConfirmationSpy = jest.spyOn(sendEmailConfirmation, 'sendEmail');
    await sut.send(sendEmailData);
    expect(sendConfirmationSpy).toHaveBeenCalledWith(sendEmailData);
  });

  it('Should call LoadAccountByEmailRepository with correct values', async () => {
    const { sut, loadAccountByEmail } = makeSut();
    const sendEmailData = { email: 'valid_email@mail.com', token: 'valid_token', body: {} };
    const loadByEmailSpy = jest.spyOn(loadAccountByEmail, 'loadByEmail');
    await sut.send(sendEmailData);
    expect(loadByEmailSpy).toHaveBeenCalledWith(sendEmailData.email);
  });
});
