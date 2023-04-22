import { SetEmailConfirmationToken } from '@domain/use-cases/mail';
import { EmailConfirmationController } from '@presentation/controllers/mail/email-confirmation-controller';
import { noContent, serverError } from '@presentation/helper/http/http-helper';
import { SetEmailConfirmationStub } from '@tests/presentation/test/mail';

type SutTypes = {
  sut: EmailConfirmationController;
  sendEmailConfirmation: SetEmailConfirmationToken;
};

const makeSut = (): SutTypes => {
  const sendEmailConfirmation = new SetEmailConfirmationStub();
  const sut = new EmailConfirmationController(sendEmailConfirmation);
  return { sut, sendEmailConfirmation };
};

describe('EmailConfirmationController', () => {
  it('Should call SendEmailConfirmation with correct value', async () => {
    const { sut, sendEmailConfirmation } = makeSut();
    const loadByEmailSpy = jest.spyOn(sendEmailConfirmation, 'set');
    await sut.handle({ body: { email: 'valid_email@mail.com' } });
    expect(loadByEmailSpy).toHaveBeenCalledWith('valid_email@mail.com');
  });

  it('Should return 204 on SendEmailConfirmation success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({ body: { email: 'valid_email@mail.com' } });
    expect(httpResponse).toEqual(noContent());
  });

  it('Should return 500 if SendEmailConfirmation throws', async () => {
    const { sut, sendEmailConfirmation } = makeSut();
    jest.spyOn(sendEmailConfirmation, 'set').mockReturnValueOnce(Promise.reject(serverError(new Error())));
    const httpResponse = await sut.handle({ body: { email: 'valid_email@mail.com' } });
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
