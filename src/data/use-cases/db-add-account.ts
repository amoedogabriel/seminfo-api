import { Hasher } from '@data/protocols/cryptography';
import { AddAccountRepository } from '@data/protocols/db';
import { LoadAccountByEmailRepository } from '@data/protocols/db/load-account-by-email-repository';
import { AddAccountModel, AccountModel } from '@domain/models';
import { AddAccount } from '@domain/use-cases';

export class DbAddAccount implements AddAccount {
  private readonly hasher: Hasher;
  private readonly addAccountRepository: AddAccountRepository;
  private readonly loadAccountByEmail: LoadAccountByEmailRepository;
  constructor(
    hasher: Hasher,
    addAccountRepository: AddAccountRepository,
    loadAccountByEmail: LoadAccountByEmailRepository
  ) {
    this.addAccountRepository = addAccountRepository;
    this.hasher = hasher;
    this.loadAccountByEmail = loadAccountByEmail;
  }
  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.loadAccountByEmail.loadByEmail(account.email);
    const hashedPassword = await this.hasher.hash(account.password);
    const accountResult = await this.addAccountRepository.addAccount({
      ...account,
      password: hashedPassword,
    });
    return accountResult;
  }
}
