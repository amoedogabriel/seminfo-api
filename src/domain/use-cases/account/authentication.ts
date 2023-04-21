import { AuthenticationModel } from '@domain/models';

export interface Authentication {
  auth(authentication: AuthenticationModel): Promise<string>;
}
