import { SetEmailConfirmationTokenRepository } from '@data/protocols/db/send-email';

export class SetEmailConfirmationTokenRepositoryStub implements SetEmailConfirmationTokenRepository {
  async setToken(_email: string): Promise<string> {
    return 'confirmation_token';
  }
}
