import { Hasher } from '@data/protocols/cryptography';
import { AddAccountRepository, LoadAccountByEmailRepository } from '@data/protocols/db';
import { AddAccountModel, AccountModel } from '@domain/models';
import { AddAccount } from '@domain/use-cases';

export class DbAddAccount implements AddAccount {
  private readonly hasher: Hasher;
  private readonly addAccountRepository: AddAccountRepository;
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository;
  constructor(
    hasher: Hasher,
    addAccountRepository: AddAccountRepository,
    loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {
    this.addAccountRepository = addAccountRepository;
    this.hasher = hasher;
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
  }
  async add(account: AddAccountModel): Promise<AccountModel> {
    const dbAccount = await this.loadAccountByEmailRepository.loadByEmail(account.email);
    if (!dbAccount) {
      const hashedPassword = await this.hasher.hash(account.password);
      const accountResult = await this.addAccountRepository.addAccount({
        ...account,
        password: hashedPassword,
      });
      return accountResult;
    }
    return null;
  }
}
