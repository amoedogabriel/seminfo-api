import { LoadAccountByEmailRepository } from '@data/protocols/db/account';
import { SetEmailConfirmationTokenRepository } from '@data/protocols/db/mail';
import { SendEmailConfirmation } from '@data/protocols/mail';
import { SetEmailConfirmationToken } from '@domain/use-cases/mail';

export class DbSetEmailConfirmationToken implements SetEmailConfirmationToken {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository;
  private readonly setEmailConfirmationTokenRepository: SetEmailConfirmationTokenRepository;
  private readonly sendEmailConfirmation: SendEmailConfirmation;
  constructor(
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    setEmailConfirmationTokenRepository: SetEmailConfirmationTokenRepository,
    sendEmailConfirmation: SendEmailConfirmation
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.setEmailConfirmationTokenRepository = setEmailConfirmationTokenRepository;
    this.sendEmailConfirmation = sendEmailConfirmation;
  }
  async set(email: string): Promise<void> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(email);
    if (account) {
      const token = await this.setEmailConfirmationTokenRepository.setToken(email);
      await this.sendEmailConfirmation.sendEmail(email, token);
    }
  }
}
