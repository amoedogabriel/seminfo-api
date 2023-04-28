import { LoadAccountByEmailRepository } from '@data/protocols/db/account';
import { SetConfirmationTokenRepository } from '@data/protocols/db/mail';
import { SetToken } from '@domain/use-cases/mail';

export class DbSetToken implements SetToken {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository;
  private readonly setConfirmationTokenRepository: SetConfirmationTokenRepository;
  constructor(
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    setEmailConfirmationTokenRepository: SetConfirmationTokenRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.setConfirmationTokenRepository = setEmailConfirmationTokenRepository;
  }
  async set(email: string): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(email);
    if (account) {
      const token = await this.setConfirmationTokenRepository.setToken(email);
      return token;
    }
    return null;
  }
}
