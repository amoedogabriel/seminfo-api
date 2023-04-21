import { SendEmailConfirmationRepository } from '@data/protocols/db/account';

export class SendEmailConfirmationStub implements SendEmailConfirmationRepository {
  async sendEmail(_email: string, _token: string): Promise<void> {
    return null;
  }
}
