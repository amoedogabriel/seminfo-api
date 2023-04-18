import { BCryptAdapter } from '../../../src/infra/cryptography/bcrypt-adapter';
import bcrypt from 'bcrypt';

const salt = 12;
const password = 'valid_password';

describe('BCryptAdapter', () => {
  it('Should call BCrypt with correct value', async () => {
    const sut = new BCryptAdapter(salt);
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.hash(password);
    expect(hashSpy).toHaveBeenCalledWith(password, salt);
  });
});
