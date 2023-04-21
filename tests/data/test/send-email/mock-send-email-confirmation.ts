import { SendEmailConfirmationRepository } from '@data/protocols/db/account/send-email-confirmation-repository';
import { SendEmailConfirmationModel } from '@domain/models/send-email';
export class SendEmailConfirmationStub implements SendEmailConfirmationRepository {
  async sendEmail(_sendEmail: SendEmailConfirmationModel): Promise<void> {
    return null;
  }
}
