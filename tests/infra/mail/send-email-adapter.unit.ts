import { SendEmailConfirmationAdapter } from '@infra/mail/send-email-adapter';

describe('SendEmailConfirmation Adapter', () => {
  it('Should return falsy if send email succeeds', async () => {
    const sut = new SendEmailConfirmationAdapter();
    const sendError = await sut.sendEmail('valid_email@mail.com', 'any_token');
    expect(sendError).toBeFalsy();
  });
});
