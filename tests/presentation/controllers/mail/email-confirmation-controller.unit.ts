import { SendEmailConfirmation } from '@domain/use-cases/send-email';
import { EmailConfirmationController } from '@presentation/controllers/mail/email-confirmation-controller';
import { noContent } from '@presentation/helper/http/http-helper';
import { SendEmailConfirmationStub } from '@tests/presentation/test/mail';

type SutTypes = {
  sut: EmailConfirmationController;
  sendEmailConfirmation: SendEmailConfirmation;
};

const makeSut = (): SutTypes => {
  const sendEmailConfirmation = new SendEmailConfirmationStub();
  const sut = new EmailConfirmationController(sendEmailConfirmation);
  return { sut, sendEmailConfirmation };
};

describe('EmailConfirmationController', () => {
  it('Should call SendEmailConfirmation with correct value', async () => {
    const { sut, sendEmailConfirmation } = makeSut();
    const loadByEmailSpy = jest.spyOn(sendEmailConfirmation, 'send');
    await sut.handle({ body: { email: 'valid_email@mail.com' } });
    expect(loadByEmailSpy).toHaveBeenCalledWith('valid_email@mail.com');
  });

  it('Should return 204 on SendEmailConfirmation success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({ body: { email: 'valid_email@mail.com' } });
    expect(httpResponse).toEqual(noContent());
  });
});
