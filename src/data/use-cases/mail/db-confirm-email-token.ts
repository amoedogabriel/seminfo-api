import { LoadAccountByEmailRepository } from '@data/protocols/db/account';
import { ConfirmEmailTokenRepository } from '@data/protocols/db/mail';
import { ConfirmEmailToken } from '@domain/use-cases/mail/confirm-email-token';

export class DbConfirmEmailToken implements ConfirmEmailToken {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository;
  private readonly confirmEmailTokenRepository: ConfirmEmailTokenRepository;
  constructor(
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    confirmEmailTokenRepository: ConfirmEmailTokenRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.confirmEmailTokenRepository = confirmEmailTokenRepository;
  }
  async confirm(email: string, _token: string): Promise<void> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(email);
    const now = new Date();
    const expirationToken = now.setHours(now.getHours());
    if (account && account.expirationToken > expirationToken) {
      await this.confirmEmailTokenRepository.confirmEmail(email);
    }
  }
}
