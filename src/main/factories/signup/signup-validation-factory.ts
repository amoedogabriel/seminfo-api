import { EmailValidatorAdapter } from '@infra/validators/email-validator-adapter';
import { StrongPasswordValidatorAdapter } from '@infra/validators/strong-password-validator-adapter';
import { Validation } from '@presentation/protocols/validation';
import { EmailValidation } from '@validation/validators/email-validation';
import { PasswordValidation } from '@validation/validators/password-validation';
import { RequiredFieldValidation } from '@validation/validators/required-field-validation';
import { ValidationComposite } from '@validation/validators/validation-composite';

export const makeSignupValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
  validations.push(new PasswordValidation('password', new StrongPasswordValidatorAdapter()));
  return new ValidationComposite(validations);
};
