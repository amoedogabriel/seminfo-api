import { Validation } from '@presentation/protocols/validation';

export class ValidationStub implements Validation {
  validate(_input: any): Error {
    return null;
  }
}
