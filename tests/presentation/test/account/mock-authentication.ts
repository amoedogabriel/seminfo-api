import { AuthenticationModel } from '@domain/models/account';
import { Authentication } from '@domain/use-cases/account';

export class AuthenticationStub implements Authentication {
  async auth(_authentication: AuthenticationModel): Promise<string> {
    return 'any_token';
  }
}
