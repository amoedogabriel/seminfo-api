import { SetConfirmationTokenRepository } from '@data/protocols/db/mail';

export class SetEmailConfirmationTokenRepositoryStub implements SetConfirmationTokenRepository {
  async setToken(_email: string): Promise<string> {
    return 'confirmation_token';
  }
}
