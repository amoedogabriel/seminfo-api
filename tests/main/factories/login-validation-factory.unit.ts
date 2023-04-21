import { StrongPasswordValidatorAdapter, EmailValidatorAdapter } from '@infra/validators';
import { makeLoginValidationFactory } from '@main/factories/login/login-validation-factory';
import { Validation } from '@presentation/protocols';
import {
  EmailValidation,
  PasswordValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@validation/validators';

jest.mock('@validation/validators/validation-composite');

describe('LoginValidation Factory', () => {
  it('Should call ValidationComposite with correct Validation ', () => {
    makeLoginValidationFactory();
    const requiredFields = ['email', 'password'];
    const validations: Validation[] = [];
    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new EmailValidation('email', new StrongPasswordValidatorAdapter()));
    validations.push(new PasswordValidation('password', new EmailValidatorAdapter()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
