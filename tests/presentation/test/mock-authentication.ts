import { AuthenticationModel } from '@domain/models';
import { Authentication } from '@domain/use-cases';

export class AuthenticationStub implements Authentication {
  async auth(_authentication: AuthenticationModel): Promise<string> {
    return 'any_token';
  }
}
