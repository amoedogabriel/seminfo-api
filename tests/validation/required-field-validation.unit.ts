import { RequiredFieldValidation } from '@validation/required-field-validation';

describe('RequiredFieldValidation', () => {
  it('Should return null if field is valid ', () => {
    const sut = new RequiredFieldValidation('field');
    const validate = sut.validate({ field: 'any_field' });
    expect(validate).toBeFalsy();
  });
});
