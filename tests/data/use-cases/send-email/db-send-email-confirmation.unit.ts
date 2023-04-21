import { SendEmailConfirmationRepository } from '@data/protocols/db/account/send-email-confirmation-repository';
import { DbSendEmailConfirmation } from '@data/use-cases/account/db-send-email-confirmation';
import { SendEmailConfirmationStub } from '@tests/data/test/send-email';

type SutTypes = {
  sut: DbSendEmailConfirmation;
  sendEmailConfirmation: SendEmailConfirmationRepository;
};

const makeSut = (): SutTypes => {
  const sendEmailConfirmation = new SendEmailConfirmationStub();
  const sut = new DbSendEmailConfirmation(sendEmailConfirmation);
  return { sut, sendEmailConfirmation };
};

describe('DbSendEmailConfirmation', () => {
  it('Should call SendEmailConfirmationRepository with correct values', async () => {
    const { sut, sendEmailConfirmation } = makeSut();
    const sendEmailData = { email: 'valid_email@mail.com', token: 'valid_token', body: {} };
    const sendConfirmationSpy = jest.spyOn(sendEmailConfirmation, 'sendEmail');
    await sut.send(sendEmailData);
    expect(sendConfirmationSpy).toHaveBeenCalledWith(sendEmailData);
  });
});
