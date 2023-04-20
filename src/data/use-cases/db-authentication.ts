import { Encrypter } from '@data/protocols/cryptography';
import { LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '@data/protocols/db';
import { AuthenticationModel } from '@domain/models';
import { Authentication } from '@domain/use-cases';

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository;
  private readonly encrypter: Encrypter;
  private readonly updateAccessToken: UpdateAccessTokenRepository;
  constructor(
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    encrypter: Encrypter,
    updateAccessToken: UpdateAccessTokenRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.encrypter = encrypter;
    this.updateAccessToken = updateAccessToken;
  }
  async auth(authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email);
    const token = await this.encrypter.encrypt(account.id);
    await this.updateAccessToken.updateAccessToken(authentication.email, token);
    return null;
  }
}
