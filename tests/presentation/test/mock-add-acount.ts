import { AccountModel } from '../../../src/domain/models/account';
import { AddAccountModel } from '../../../src/domain/models/add-account';
import { AddAccount } from '../../../src/domain/use-cases/add-account';
import { makeFakeAddAccountResult } from '../../helper/make-fake-add-account-result';

export class AddAccountStub implements AddAccount {
  async add(_account: AddAccountModel): Promise<AccountModel> {
    return makeFakeAddAccountResult();
  }
}
