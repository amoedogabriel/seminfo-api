import { AddAccountModel, AccountModel } from '@domain/models';

export interface AddAccountRepository {
  addAccount(account: AddAccountModel): Promise<AccountModel>;
}
