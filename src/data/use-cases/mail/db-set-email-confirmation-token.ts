import { LoadAccountByEmailRepository } from '@data/protocols/db/account';
import { SetEmailConfirmationTokenRepository } from '@data/protocols/db/mail';
import { SetToken } from '@domain/use-cases/mail';

export class DbSetEmailConfirmationToken implements SetToken {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository;
  private readonly setEmailConfirmationTokenRepository: SetEmailConfirmationTokenRepository;
  constructor(
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    setEmailConfirmationTokenRepository: SetEmailConfirmationTokenRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.setEmailConfirmationTokenRepository = setEmailConfirmationTokenRepository;
  }
  async set(email: string): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(email);
    if (account) {
      const token = await this.setEmailConfirmationTokenRepository.setToken(email);
      return token;
    }
    return null;
  }
}
