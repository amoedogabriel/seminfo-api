import { AddAccountRepository } from '@data/protocols/db/account';
import { AddAccountModel, AccountModel } from '@domain/models/account';

export class AddAccountRepositoryStub implements AddAccountRepository {
  async addAccount(_account: AddAccountModel): Promise<AccountModel> {
    return null;
  }
}
