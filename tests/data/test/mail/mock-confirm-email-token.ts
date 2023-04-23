import { ConfirmEmailTokenRepository } from '@data/protocols/db/mail';

export class ConfirmEmailTokenRepositoryStub implements ConfirmEmailTokenRepository {
  async confirmEmail(_email: string): Promise<string> {
    return 'valid_access_token';
  }
}
