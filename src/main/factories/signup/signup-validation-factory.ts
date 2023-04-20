import { Validation } from "@presentation/protocols/validation";
import { RequiredFieldValidation } from "@validation/required-field-validation";
import { ValidationComposite } from "@validation/validation-composite";


export const makeSignupValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field));
  }
 
  return new ValidationComposite(validations);
};
