import { MissingParamError } from '@presentation/errors';
import { RequiredFieldValidation } from '@validation/validators';

describe('RequiredFieldValidation', () => {
  it('Should return null if field is valid ', () => {
    const sut = new RequiredFieldValidation('field');
    const validate = sut.validate({ field: 'any_field' });
    expect(validate).toBeFalsy();
  });

  it('Should return MissingParamError if Validation fails ', () => {
    const sut = new RequiredFieldValidation('field');
    const validate = sut.validate({ name: 'any_field' });
    expect(validate).toEqual(new MissingParamError('field'));
  });
});
