import { LoadAccountByEmailRepository } from '@data/protocols/db/account';
import { ConfirmEmailToken } from '@domain/use-cases/mail/confirm-email-token';

export class DbConfirmEmailToken implements ConfirmEmailToken {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository;
  constructor(loadAccountByEmailRepository: LoadAccountByEmailRepository) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
  }
  async confirm(email: string, _token: string): Promise<void> {
    await this.loadAccountByEmailRepository.loadByEmail(email);
    return null;
  }
}
