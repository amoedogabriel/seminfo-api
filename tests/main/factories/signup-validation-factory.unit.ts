import { makeSignupValidation } from '@main/factories/signup/signup-validation-factory';
import { Validation } from '@presentation/protocols/validation';
import { RequiredFieldValidation } from '@validation/validators/required-field-validation';
import { ValidationComposite } from '@validation/validators/validation-composite';

jest.mock('@validation/validators/validation-composite');

describe('SignupValidation Factory', () => {
  it('Should call ValidationComposite with correct values', () => {
    makeSignupValidation();
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
    const validations: Validation[] = [];
    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidation(field));
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
