import { PasswordValidator } from '@validation/protocols/password-validator';
import isStrongPassword from 'validator/lib/isStrongPassword';

export class StrongPasswordValidatorAdapter implements PasswordValidator {
  isValid(password: string): boolean {
    return isStrongPassword(password);
  }
}
