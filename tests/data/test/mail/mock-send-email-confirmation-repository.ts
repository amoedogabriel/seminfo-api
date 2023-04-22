import { SendEmailConfirmation } from '@data/protocols/mail';

export class SendEmailConfirmationStub implements SendEmailConfirmation {
  async sendEmail(_email: string, _token: string): Promise<void> {
    return null;
  }
}
