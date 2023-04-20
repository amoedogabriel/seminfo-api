import { EmailValidatorAdapter } from '@infra/validators';
import { InvalidParamError } from '@presentation/errors';
import { EmailValidation } from '@validation/validators';

describe('EmailValidation', () => {
  it('Should return InvalidParamError if Validation fails', () => {
    const emailValidator = new EmailValidatorAdapter();
    const invalidEmail = 'invalid_email';
    const sut = new EmailValidation('field', emailValidator);
    const validate = sut.validate({ field: invalidEmail });
    expect(validate).toEqual(new InvalidParamError('field'));
  });

  it('Should return null if Validation succeeds', () => {
    const emailValidator = new EmailValidatorAdapter();
    const invalidEmail = 'valid_email@mail.com';
    const sut = new EmailValidation('field', emailValidator);
    const validate = sut.validate({ field: invalidEmail });
    expect(validate).toBeNull();
  });
});
