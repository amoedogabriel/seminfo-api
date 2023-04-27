import { SendEmailProvider } from '@data/protocols/mail';
import { ServiceSendEmail } from '@data/use-cases/mail';

import { SendEmailProviderStub } from '@tests/data/test/mail';
type SutTypes = {
  sut: ServiceSendEmail;
  sendEmail: SendEmailProvider;
};

const makeSut = (): SutTypes => {
  const sendEmail = new SendEmailProviderStub();
  const sut = new ServiceSendEmail(sendEmail);
  return {
    sut,
    sendEmail,
  };
};

describe('ServiceSendEmail', () => {
  it('Should call SendEmailProvider with correct values', async () => {
    const { sut, sendEmail } = makeSut();
    const sendEmailSpy = jest.spyOn(sendEmail, 'sendEmail');
    await sut.send({ email: 'valid_email@mail.com', token: 'confirmation_token' });
    expect(sendEmailSpy).toHaveBeenCalledWith({ email: 'valid_email@mail.com', token: 'confirmation_token' });
  });

  it('Should throw if SendEmailProvider throws', async () => {
    const { sut, sendEmail } = makeSut();
    jest.spyOn(sendEmail, 'sendEmail').mockReturnValueOnce(Promise.reject(new Error()));
    const response = sut.send({ email: 'valid_email@mail.com', token: 'confirmation_token' });
    expect(response).rejects.toEqual(new Error());
  });
});
