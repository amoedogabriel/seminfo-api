import { LoadAccountByEmailRepository } from '@data/protocols/db/account';
import { ConfirmEmailTokenRepository, ValidateConfirmationTokenRepository } from '@data/protocols/db/mail';
import { AccountModel } from '@domain/models/account';
import { EmailConfirmationController } from '@presentation/controllers/mail';
import { InvalidParamError, UnregisteredEmailError } from '@presentation/errors';
import { badRequest, forbidden, ok } from '@presentation/helper/http/http-helper';
import { ConfirmEmailTokenRepositoryStub } from '@tests/data/test/mail';
import { makeFakeAddAccountResult } from '@tests/helper/account';
import { ValidateConfirmationTokenRepositoryStub } from '@tests/presentation/test/mail';

export class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
  async loadByEmail(_email: string): Promise<AccountModel> {
    return makeFakeAddAccountResult();
  }
}

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

  it('Should return 403 if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmail } = makeSut();
    jest.spyOn(loadAccountByEmail, 'loadByEmail').mockImplementationOnce(null);
    const httpResponse = await sut.handle({
      email: 'valid_email@mail.com',
      confirmationToken: 'valid_token',
    });
    expect(httpResponse).toEqual(forbidden(new UnregisteredEmailError('valid_email@mail.com')));
  });

  it('Should call ValidateConfirmationTokenRepository with correct values', async () => {
    const { sut, validateConfirmationToken } = makeSut();
    const validateSpy = jest.spyOn(validateConfirmationToken, 'validate');
    await sut.handle({ email: 'valid_email@mail.com', confirmationToken: 'valid_token' });
    expect(validateSpy).toHaveBeenCalledWith('valid_email@mail.com', 'valid_token');
  });

  it('Should return 400 if ValidateConfirmationTokenRepository is invalid', async () => {
    const { sut, validateConfirmationToken } = makeSut();
    jest.spyOn(validateConfirmationToken, 'validate').mockReturnValueOnce(Promise.resolve(false));
    const httpResponse = await sut.handle({
      email: 'valid_email@mail.com',
      confirmationToken: 'valid_token',
    });
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('confirmationToken')));
  });

  it('Should call ConfirmEmailTokenRepository with correct values', async () => {
    const { sut, confirmEmailToken } = makeSut();
    const confirmEmailSpy = jest.spyOn(confirmEmailToken, 'confirmEmail');
    await sut.handle({ email: 'valid_email@mail.com', confirmationToken: 'valid_token' });
    expect(confirmEmailSpy).toHaveBeenCalledWith('valid_email@mail.com');
  });

  it('Should return an access token if ConfirmEmailTokenRepository succeeds', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({
      email: 'valid_email@mail.com',
      confirmationToken: 'valid_token',
    });
    expect(httpResponse).toEqual(ok('valid_access_token'));
  });
});
