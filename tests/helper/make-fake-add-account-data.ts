import { AddAccountModel } from '../../src/domain/models/add-account';

export const makeFakeAddAccountData = (): AddAccountModel => {
  return {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
  };
};
