import { AccountModel } from '../models/account';
import { AddAccountModel } from '../models/add-account';

export interface AddAccount {
  add(params: AddAccountModel): Promise<AccountModel>;
}
