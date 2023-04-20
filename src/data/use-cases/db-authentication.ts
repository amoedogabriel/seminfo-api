import { Encrypter } from '@data/protocols/cryptography';
import { LoadAccountByEmailRepository } from '@data/protocols/db';
import { AuthenticationModel } from '@domain/models';
import { Authentication } from '@domain/use-cases';

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository;
  private readonly encrypter: Encrypter;
  constructor(loadAccountByEmailRepository: LoadAccountByEmailRepository, encrypter: Encrypter) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.encrypter = encrypter;
  }
  async auth(authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email);
    await this.encrypter.encrypt(account.id);
    return null;
  }
}
