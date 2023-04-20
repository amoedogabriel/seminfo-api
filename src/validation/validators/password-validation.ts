import { InvalidParamError } from '@presentation/errors';
import { Validation } from '@presentation/protocols';
import { PasswordValidator } from '@validation/protocols';

export class PasswordValidation implements Validation {
  private readonly fieldName: string;
  private readonly passwordValidator: PasswordValidator;
  constructor(fieldName: string, passwordValidator: PasswordValidator) {
    this.fieldName = fieldName;
    this.passwordValidator = passwordValidator;
  }
  validate(input: any): Error {
    const isValid = this.passwordValidator.isValid(input[this.fieldName]);
    if (!isValid) {
      return new InvalidParamError(this.fieldName);
    }
    return null;
  }
}
