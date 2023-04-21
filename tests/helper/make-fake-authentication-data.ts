import { AuthenticationModel } from '@domain/models/account';

export const makeFakeAuthenticationData = (): AuthenticationModel => {
  return {
    email: 'valid_mail@mail.com',
    password: 'valid_password',
  };
};
