import { Validation } from '@presentation/protocols/validation';

export class ValidationComposite implements Validation {
  private readonly validations: Validation[];
  constructor(validations: Validation[]) {
    this.validations = validations;
  }
  validate(input: any): Error {
    for (const validation of this.validations) {
      const errorValidation = validation.validate(input);
      if (errorValidation) {
        return errorValidation;
      }
    }
    return null;
  }
}
