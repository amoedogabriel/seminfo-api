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

  it('Should return a hashed password on hash success', async () => {
    const sut = new BCryptAdapter(salt);
    const hashResult = await sut.hash(password);
    const compare = await bcrypt.compare(password, hashResult);
    expect(compare).toBeTruthy();
  });

  it('Should throw if bcrypt hash throws', async () => {
    const sut = new BCryptAdapter(salt);
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => Promise.reject(new Error()));
    const promise = sut.hash(password);
    expect(promise).rejects.toEqual(new Error());
  });
});
