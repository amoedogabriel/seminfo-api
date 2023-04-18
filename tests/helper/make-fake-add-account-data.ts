import { AddAccountModel } from '@domain/models';

export const makeFakeAddAccountData = (): AddAccountModel => {
  return {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
  };
};
