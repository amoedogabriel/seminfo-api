import { StrongPasswordValidatorAdapter } from '@infra/validators';
import { InvalidParamError } from '@presentation/errors';
import { PasswordValidation } from '@validation/validators';

describe('PasswordValidation', () => {
  it('Should return InvalidParamError if Validation fails ', () => {
    const password = 'test';
    const passwordValidator = new StrongPasswordValidatorAdapter();
    const sut = new PasswordValidation('password', passwordValidator);
    const validate = sut.validate({ password });
    expect(validate).toEqual(new InvalidParamError('password'));
  });

  it('Should return null if Validation succeeds ', () => {
    const password = '@B124578t';
    const passwordValidator = new StrongPasswordValidatorAdapter();
    const sut = new PasswordValidation('password', passwordValidator);
    const validate = sut.validate({ password });
    expect(validate).toBeNull();
  });
});
