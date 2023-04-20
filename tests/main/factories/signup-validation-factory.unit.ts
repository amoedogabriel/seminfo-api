import { EmailValidatorAdapter, StrongPasswordValidatorAdapter } from '@infra/validators';
import { makeSignupValidation } from '@main/factories/signup';
import { Validation } from '@presentation/protocols';
import {
  RequiredFieldValidation,
  EmailValidation,
  PasswordValidation,
  ValidationComposite,
} from '@validation/validators';

jest.mock('@validation/validators/validation-composite');

describe('SignupValidation Factory', () => {
  it('Should call ValidationComposite with correct values', () => {
    makeSignupValidation();
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
    const validations: Validation[] = [];
    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
    validations.push(new PasswordValidation('password', new StrongPasswordValidatorAdapter()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
