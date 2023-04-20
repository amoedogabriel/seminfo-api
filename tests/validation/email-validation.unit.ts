import { EmailValidatorAdapter } from '@infra/validators/email-validator-adapter';
import { InvalidParamError } from '@presentation/errors';
import { EmailValidation } from '@validation/validators/email-validation';

describe('EmailValidation', () => {
  it('Should return InvalidParamError if Validation fails', () => {
    const emailValidator = new EmailValidatorAdapter();
    const invalidEmail = 'invalid_email';
    const sut = new EmailValidation('field', emailValidator);
    const validate = sut.validate({ field: invalidEmail });
    expect(validate).toEqual(new InvalidParamError('field'));
  });
});
