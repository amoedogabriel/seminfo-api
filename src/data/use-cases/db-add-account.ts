import { AccountModel } from '../../domain/models/account';
import { AddAccountModel } from '../../domain/models/add-account';
import { AddAccount } from '../../domain/use-cases/add-account';
import { AddAccountRepository } from '../protocols/add-account-repository';

export class DbAddAccount implements AddAccount {
  private readonly addAccountRepository: AddAccountRepository;
  constructor(addAccountRepository: AddAccountRepository) {
    this.addAccountRepository = addAccountRepository;
  }
  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.addAccountRepository.addAccount(account);
    return null;
  }
}
