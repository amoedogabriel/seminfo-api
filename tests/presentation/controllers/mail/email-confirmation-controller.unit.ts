import { LoadAccountByEmailRepository } from '@data/protocols/db/account';
import { ConfirmEmailTokenRepository, ValidateConfirmationTokenRepository } from '@data/protocols/db/mail';
import { EmailConfirmationController } from '@presentation/controllers/mail';
import { LoadAccountByEmailRepositoryStub } from '@tests/data/test/account';
import { ConfirmEmailTokenRepositoryStub } from '@tests/data/test/mail';
import { ValidateConfirmationTokenRepositoryStub } from '@tests/presentation/test/mail';

type SutTypes = {
  sut: EmailConfirmationController;
  loadAccountByEmail: LoadAccountByEmailRepository;
  validateConfirmationToken: ValidateConfirmationTokenRepository;
  confirmEmailToken: ConfirmEmailTokenRepository;
};

const makeSut = (): SutTypes => {
  const loadAccountByEmail = new LoadAccountByEmailRepositoryStub();
  const validateConfirmationToken = new ValidateConfirmationTokenRepositoryStub();
  const confirmEmailToken = new ConfirmEmailTokenRepositoryStub();
  const sut = new EmailConfirmationController(
    loadAccountByEmail,
    validateConfirmationToken,
    confirmEmailToken
  );
  return { sut, loadAccountByEmail, validateConfirmationToken, confirmEmailToken };
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

  it('Should call ConfirmEmailTokenRepository with correct values', async () => {
    const { sut, confirmEmailToken } = makeSut();
    const loadByEmailSpy = jest.spyOn(confirmEmailToken, 'confirmEmail');
    await sut.handle({ email: 'valid_email@mail.com', confirmationToken: 'valid_token' });
    expect(loadByEmailSpy).toHaveBeenCalledWith('valid_email@mail.com');
  });
});
