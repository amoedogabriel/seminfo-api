import { HashCompare } from '@data/protocols/cryptography';

export class HashCompareStub implements HashCompare {
  async compare(value: string, hash: string): Promise<boolean> {
    return value === hash;
  }
}
