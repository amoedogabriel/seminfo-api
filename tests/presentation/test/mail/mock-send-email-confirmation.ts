import { SendEmailConfirmation } from '@domain/use-cases/send-email';

export class SendEmailConfirmationStub implements SendEmailConfirmation {
  async send(_email: string): Promise<void> {
    return null;
  }
}
