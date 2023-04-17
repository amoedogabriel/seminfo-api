import { Hasher } from '../../../src/data/protocols/cryptography/hasher';

export class HasherStub implements Hasher {
  async hash(_value: string): Promise<string> {
    return 'hashed_password';
  }
}
