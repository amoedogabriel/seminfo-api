import { LoadAccountByEmailRepository } from '@data/protocols/db/account';
import { SendEmailConfirmationRepository } from '@data/protocols/db/account/send-email-confirmation-repository';
import { SetEmailConfirmationTokenRepository } from '@data/protocols/db/send-email';
import { SendEmailConfirmation } from '@domain/use-cases/send-email';

export class DbSendEmailConfirmation implements SendEmailConfirmation {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository;
  private readonly setEmailConfirmationTokenRepository: SetEmailConfirmationTokenRepository;
  private readonly sendEmailConfirmationRepository: SendEmailConfirmationRepository;
  constructor(
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    setEmailConfirmationTokenRepository: SetEmailConfirmationTokenRepository,
    sendEmailConfirmationRepository: SendEmailConfirmationRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.setEmailConfirmationTokenRepository = setEmailConfirmationTokenRepository;
    this.sendEmailConfirmationRepository = sendEmailConfirmationRepository;
  }
  async send(email: string): Promise<void> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(email);
    if (account) {
      const token = await this.setEmailConfirmationTokenRepository.setToken(email);
      await this.sendEmailConfirmationRepository.sendEmail(email, token);
    }
  }
}
