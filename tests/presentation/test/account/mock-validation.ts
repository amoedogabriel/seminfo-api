import { Validation } from '@presentation/protocols';

export class ValidationStub implements Validation {
  validate(_input: any): Error {
    return null;
  }
}
