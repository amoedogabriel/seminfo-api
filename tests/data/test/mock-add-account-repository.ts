import { AddAccountRepository } from '../../../src/data/protocols/add-account-repository';
import { AccountModel } from '../../../src/domain/models/account';
import { AddAccountModel } from '../../../src/domain/models/add-account';

export class AddAccountRepositoryStub implements AddAccountRepository {
  async addAccount(_account: AddAccountModel): Promise<AccountModel> {
    return null;
  }
}
