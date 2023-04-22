import { SendEmailConfirmation } from '@domain/use-cases/mail';

export class SendEmailConfirmationStub implements SendEmailConfirmation {
  async send(_email: string): Promise<void> {
    return null;
  }
}
