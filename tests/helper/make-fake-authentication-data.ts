import { AuthenticationModel } from '@domain/models';

export const makeFakeAuthenticationData = (): AuthenticationModel => {
  return {
    email: 'valid_mail@mail.com',
    password: 'valid_password',
  };
};
