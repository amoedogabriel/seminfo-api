import { LoadAccountByEmailRepository } from '@data/protocols/db/account';
import { ConfirmEmailRepository } from '@data/protocols/db/mail';
import { ConfirmEmailModel } from '@domain/models/mail';
import { ConfirmEmail } from '@domain/use-cases/mail/';

export class DbConfirmEmailToken implements ConfirmEmail {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository;
  private readonly confirmEmailTokenRepository: ConfirmEmailRepository;
  constructor(
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    confirmEmailTokenRepository: ConfirmEmailRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.confirmEmailTokenRepository = confirmEmailTokenRepository;
  }
  async confirm(data: ConfirmEmailModel): Promise<void> {
    const now = new Date();
    const expirationToken = now.setHours(now.getHours());
    const account = await this.loadAccountByEmailRepository.loadByEmail(data.email);
    if (account && account.expirationToken > expirationToken && account.confirmationToken === data.token) {
      await this.confirmEmailTokenRepository.confirmEmail(data.email);
    }
  }
}
