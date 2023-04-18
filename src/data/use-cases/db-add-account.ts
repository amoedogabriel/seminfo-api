import { Hasher } from '@data/protocols/cryptography';
import { AddAccountRepository } from '@data/protocols/db';
import { AddAccountModel, AccountModel } from '@domain/models';
import { AddAccount } from '@domain/use-cases';

export class DbAddAccount implements AddAccount {
  private readonly hasher: Hasher;
  private readonly addAccountRepository: AddAccountRepository;
  constructor(hasher: Hasher, addAccountRepository: AddAccountRepository) {
    this.addAccountRepository = addAccountRepository;
    this.hasher = hasher;
  }
  async add(account: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(account.password);
    const accountResult = await this.addAccountRepository.addAccount({
      ...account,
      password: hashedPassword,
    });
    return accountResult;
  }
}
