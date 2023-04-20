import { InvalidParamError } from '@presentation/errors';
import { Validation } from '@presentation/protocols/validation';

export class CompareFieldValidation implements Validation {
  private readonly fieldName: string;
  private readonly fieldToCompare: string;
  constructor(fieldName: string, fieldToCompare: string) {
    this.fieldName = fieldName;
    this.fieldToCompare = fieldToCompare;
  }
  validate(input: any): Error {
    if (input[this.fieldName] !== input[this.fieldToCompare]) {
      return new InvalidParamError(this.fieldName);
    }
    return null;
  }
}
