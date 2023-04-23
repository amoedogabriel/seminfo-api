import { AccountModel } from '@domain/models/account';

export const makeFakeAddAccountResult = (): AccountModel => {
  return {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    activated: false,
  };
};
