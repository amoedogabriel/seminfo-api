import { AuthenticationModel } from '@domain/models/account';

export interface Authentication {
  auth(authentication: AuthenticationModel): Promise<string>;
}
