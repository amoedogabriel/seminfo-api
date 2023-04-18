import { Hasher } from '@data/protocols/cryptography';

export class HasherStub implements Hasher {
  async hash(_value: string): Promise<string> {
    return 'hashed_password';
  }
}
