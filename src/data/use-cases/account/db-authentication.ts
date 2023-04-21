import { Encrypter } from '@data/protocols/cryptography';
import { HashCompare } from '@data/protocols/cryptography/hash-compare';
import { LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '@data/protocols/db/account';
import { AuthenticationModel } from '@domain/models/account';
import { Authentication } from '@domain/use-cases/account';

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository;
  private readonly updateAccessToken: UpdateAccessTokenRepository;
  private readonly encrypter: Encrypter;
  private readonly hashCompare: HashCompare;
  constructor(
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    updateAccessToken: UpdateAccessTokenRepository,
    encrypter: Encrypter,
    hashCompare: HashCompare
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.updateAccessToken = updateAccessToken;
    this.encrypter = encrypter;
    this.hashCompare = hashCompare;
  }
  async auth(authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email);
    if (account) {
      const isValid = await this.hashCompare.compare(authentication.password, account.password);
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id);
        await this.updateAccessToken.updateAccessToken(authentication.email, accessToken);
        return accessToken;
      }
    }
    return null;
  }
}
