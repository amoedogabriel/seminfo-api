import { HashCompare } from '@data/protocols/cryptography';

export class HashCompareStub implements HashCompare {
  async compare(_value: string, _hash: string): Promise<boolean> {
    return true;
  }
}
