import { SetEmailConfirmationToken } from '@domain/use-cases/mail';

export class SetEmailConfirmationStub implements SetEmailConfirmationToken {
  async set(_email: string): Promise<string> {
    return 'confirmation_token';
  }
}
