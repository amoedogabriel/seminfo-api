import { LoadAccountByEmailRepository } from '@data/protocols/db/load-account-by-email-repository';
import { AccountModel } from '@domain/models';

export class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
  async loadByEmail(_email: string): Promise<AccountModel> {
    return null;
  }
}
