import { LoadAccountByEmailRepository } from '@data/protocols/db/account';
import { SetEmailConfirmationTokenRepository } from '@data/protocols/db/mail';
import { SetEmailConfirmationToken } from '@domain/use-cases/mail';

export class DbSetEmailConfirmationToken implements SetEmailConfirmationToken {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository;
  private readonly setEmailConfirmationTokenRepository: SetEmailConfirmationTokenRepository;
  constructor(
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    setEmailConfirmationTokenRepository: SetEmailConfirmationTokenRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.setEmailConfirmationTokenRepository = setEmailConfirmationTokenRepository;
  }
  async set(email: string): Promise<void> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(email);
    if (account) {
      await this.setEmailConfirmationTokenRepository.setToken(email);
    }
  }
}
