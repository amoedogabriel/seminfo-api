import { AccountModel } from '../../../domain/models/account';
import { AddAccountModel } from '../../../domain/models/add-account';

export interface AddAccountRepository {
  addAccount(account: AddAccountModel): Promise<AccountModel>;
}
