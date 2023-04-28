import { SetToken } from '@domain/use-cases/mail';

export class SetEmailConfirmationStub implements SetToken {
  async set(_email: string): Promise<string> {
    return 'confirmation_token';
  }
}
