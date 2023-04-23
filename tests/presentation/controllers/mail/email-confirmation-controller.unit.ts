import { LoadAccountByEmailRepository } from '@data/protocols/db/account';
import { ValidateConfirmationTokenRepository } from '@data/protocols/db/mail';
import { EmailConfirmationController } from '@presentation/controllers/mail';
import { LoadAccountByEmailRepositoryStub } from '@tests/data/test/account';
import { ValidateConfirmationTokenRepositoryStub } from '@tests/presentation/test/mail';

type SutTypes = {
  sut: EmailConfirmationController;
  loadAccountByEmail: LoadAccountByEmailRepository;
  validateConfirmationToken: ValidateConfirmationTokenRepository;
};

const makeSut = (): SutTypes => {
  const loadAccountByEmail = new LoadAccountByEmailRepositoryStub();
  const validateConfirmationToken = new ValidateConfirmationTokenRepositoryStub();
  const sut = new EmailConfirmationController(loadAccountByEmail, validateConfirmationToken);
  return { sut, loadAccountByEmail, validateConfirmationToken };
};

describe('EmailConfirmationController', () => {
  it('Should call LoadAccountByEmailRepository with correct value', async () => {
    const { sut, loadAccountByEmail } = makeSut();
    const loadByEmailSpy = jest.spyOn(loadAccountByEmail, 'loadByEmail');
    await sut.handle({ email: 'valid_email@mail.com' });
    expect(loadByEmailSpy).toHaveBeenCalledWith('valid_email@mail.com');
  });

  it('Should call ValidateConfirmationTokenRepository with correct values', async () => {
    const { sut, validateConfirmationToken } = makeSut();
    const loadByEmailSpy = jest.spyOn(validateConfirmationToken, 'validate');
    await sut.handle({ email: 'valid_email@mail.com', confirmationToken: 'valid_token' });
    expect(loadByEmailSpy).toHaveBeenCalledWith('valid_email@mail.com', 'valid_token');
  });
});
