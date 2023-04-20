import { AddAccountModel, AccountModel } from '@domain/models';
import { AddAccount } from '@domain/use-cases';
import { makeFakeAddAccountResult } from '@tests/helper';

export class AddAccountStub implements AddAccount {
  async add(_account: AddAccountModel): Promise<AccountModel> {
    return makeFakeAddAccountResult();
  }
}
