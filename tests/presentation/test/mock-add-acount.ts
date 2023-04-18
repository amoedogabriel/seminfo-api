import { AddAccountModel, AccountModel } from '@domain/models';
import { AddAccount } from '@domain/use-cases';
import { makeFakeAddAccountResult } from '@tests/helper/make-fake-add-account-result';

export class AddAccountStub implements AddAccount {
  async add(_account: AddAccountModel): Promise<AccountModel> {
    return makeFakeAddAccountResult();
  }
}
