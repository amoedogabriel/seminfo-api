import { StrongPasswordValidatorAdapter } from '@infra/validators/strong-password-validator-adapter';
import { InvalidParamError } from '@presentation/errors';
import { PasswordValidation } from '@validation/validators/password-validation';

describe('PasswordValidation', () => {
  it('Should return InvalidParamError if Validation fails ', () => {
    const password = 'test';
    const passwordValidator = new StrongPasswordValidatorAdapter();
    const sut = new PasswordValidation('password', passwordValidator);
    const validate = sut.validate({ password });
    expect(validate).toEqual(new InvalidParamError('password'));
  });
});
