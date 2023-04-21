import { SendEmailConfirmationRepository } from '@data/protocols/db/account/send-email-confirmation-repository';
import { SendEmailConfirmationModel } from '@domain/models/send-email';
import { SendEmailConfirmation } from '@domain/use-cases/send-email';

export class DbSendEmailConfirmation implements SendEmailConfirmation {
  private readonly sendEmailConfirmation: SendEmailConfirmationRepository;
  constructor(sendEmailConfirmation: SendEmailConfirmationRepository) {
    this.sendEmailConfirmation = sendEmailConfirmation;
  }
  async send(emailData: SendEmailConfirmationModel): Promise<void> {
    await this.sendEmailConfirmation.sendEmail(emailData);
    return null;
  }
}
