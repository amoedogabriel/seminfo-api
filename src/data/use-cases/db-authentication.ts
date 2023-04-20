import { LoadAccountByEmailRepository } from '@data/protocols/db';
import { AuthenticationModel } from '@domain/models';
import { Authentication } from '@domain/use-cases';

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository;
  constructor(loadAccountByEmailRepository: LoadAccountByEmailRepository) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
  }
  async auth(authentication: AuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.loadByEmail(authentication.email);
    return null;
  }
}
