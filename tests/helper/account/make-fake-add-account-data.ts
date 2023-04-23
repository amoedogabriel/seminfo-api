import { AddAccountModel } from '@domain/models/account';

export const makeFakeAddAccountData = (): AddAccountModel => {
  return {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    activated: false,
  };
};
