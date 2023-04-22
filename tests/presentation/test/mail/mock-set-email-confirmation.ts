import { SetEmailConfirmationToken } from '@domain/use-cases/mail';

export class SetEmailConfirmationStub implements SetEmailConfirmationToken {
  async send(_email: string): Promise<void> {
    return null;
  }
}
