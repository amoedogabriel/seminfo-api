import { AccountModel, AddAccountModel } from '@domain/models/account';

export interface AddAccount {
  add(account: AddAccountModel): Promise<AccountModel>;
}
