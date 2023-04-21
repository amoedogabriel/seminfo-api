import { LoadAccountByEmailRepository } from '@data/protocols/db';
import { AccountModel } from '@domain/models/account';

export class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
  async loadByEmail(_email: string): Promise<AccountModel> {
    return null;
  }
}
