import { ValidateConfirmationTokenRepository } from '@data/protocols/db/mail';

export class ValidateConfirmationTokenRepositoryStub implements ValidateConfirmationTokenRepository {
  async validate(_email: string, _token: string): Promise<boolean> {
    return true;
  }
}
