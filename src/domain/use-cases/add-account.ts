import { AccountModel, AddAccountModel } from '@domain/models';

export interface AddAccount {
  add(account: AddAccountModel): Promise<AccountModel>;
}
