import { InvalidParamError } from '@presentation/errors';
import { CompareFieldValidation } from '@validation/compare-field-validation';

describe('CompareFieldValidation', () => {
  it('Should return InvalidParamError if Validation fails ', () => {
    const sut = new CompareFieldValidation('password', 'passwordConfirmation');
    const validate = sut.validate({ password: 'any_password', passwordConfirmation: 'other_password' });
    expect(validate).toEqual(new InvalidParamError('password'));
  });
});
