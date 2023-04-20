import { Encrypter } from '@data/protocols/cryptography';

export class EncrypterStub implements Encrypter {
  async encrypt(_value: string): Promise<string> {
    return 'any_token';
  }
}
