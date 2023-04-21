import { AddAccountModel, AccountModel } from '@domain/models/account';

export interface AddAccountRepository {
  addAccount(account: AddAccountModel): Promise<AccountModel>;
}
