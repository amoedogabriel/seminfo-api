import { AccountModel } from '../../domain/models/account';
import { AddAccountModel } from '../../domain/models/add-account';
import { AddAccount } from '../../domain/use-cases/add-account';
import { Hasher } from '../protocols/cryptography/hasher';
import { AddAccountRepository } from '../protocols/db/add-account-repository';

export class DbAddAccount implements AddAccount {
  private readonly hasher: Hasher;
  private readonly addAccountRepository: AddAccountRepository;
  constructor(hasher: Hasher, addAccountRepository: AddAccountRepository) {
    this.addAccountRepository = addAccountRepository;
    this.hasher = hasher;
  }
  async add(account: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(account.password);
    await this.addAccountRepository.addAccount({
      ...account,
      password: hashedPassword,
    });
    return null;
  }
}
