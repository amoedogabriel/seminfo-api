import { EmailValidatorAdapter, StrongPasswordValidatorAdapter } from '@infra/validators';
import { Validation } from '@presentation/protocols';
import {
  EmailValidation,
  PasswordValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@validation/validators';

export const makeLoginValidationFactory = () => {
  const requiredFields = ['email', 'password'];
  const validations: Validation[] = [];
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
  validations.push(new PasswordValidation('password', new StrongPasswordValidatorAdapter()));
  return new ValidationComposite(validations);
};
