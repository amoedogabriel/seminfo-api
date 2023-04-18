import { Hasher } from '@data/protocols/cryptography';
import bcrypt from 'bcrypt';

export class BCryptAdapter implements Hasher {
  private readonly salt: number;
  constructor(salt: number) {
    this.salt = salt;
  }
  async hash(value: string): Promise<string> {
    const hashResult = await bcrypt.hash(value, this.salt);
    return hashResult;
  }
}
