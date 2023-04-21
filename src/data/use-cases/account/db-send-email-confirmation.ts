import { LoadAccountByEmailRepository } from '@data/protocols/db/account';
import { SendEmailConfirmationRepository } from '@data/protocols/db/account/send-email-confirmation-repository';
import { SendEmailConfirmationModel } from '@domain/models/send-email';
import { SendEmailConfirmation } from '@domain/use-cases/send-email';

export class DbSendEmailConfirmation implements SendEmailConfirmation {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository;
  private readonly sendEmailConfirmationRepository: SendEmailConfirmationRepository;
  constructor(
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    sendEmailConfirmationRepository: SendEmailConfirmationRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.sendEmailConfirmationRepository = sendEmailConfirmationRepository;
  }
  async send(emailData: SendEmailConfirmationModel): Promise<void> {
    await this.loadAccountByEmailRepository.loadByEmail(emailData.email);
    await this.sendEmailConfirmationRepository.sendEmail(emailData);
    return null;
  }
}
