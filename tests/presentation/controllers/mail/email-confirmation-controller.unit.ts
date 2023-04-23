import { LoadAccountByEmailRepository } from '@data/protocols/db/account';
import { ConfirmEmailTokenRepository, ValidateConfirmationTokenRepository } from '@data/protocols/db/mail';
import { AccountModel } from '@domain/models/account';
import { Authentication } from '@domain/use-cases/account';
import { EmailConfirmationController } from '@presentation/controllers/mail';
import { ExpiredTokenError, InvalidParamError, UnregisteredEmailError } from '@presentation/errors';
import { badRequest, forbidden, ok, serverError, unauthorized } from '@presentation/helper/http/http-helper';
import { ConfirmEmailTokenRepositoryStub } from '@tests/data/test/mail';
import { makeFakeAddAccountResult } from '@tests/helper/account';
import { AuthenticationStub } from '@tests/presentation/test/account';
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
  authentication: Authentication;
};

const makeSut = (): SutTypes => {
  const loadAccountByEmail = new LoadAccountByEmailRepositoryStub();
  const validateConfirmationToken = new ValidateConfirmationTokenRepositoryStub();
  const confirmEmailToken = new ConfirmEmailTokenRepositoryStub();
  const authentication = new AuthenticationStub();
  const sut = new EmailConfirmationController(
    loadAccountByEmail,
    validateConfirmationToken,
    confirmEmailToken,
    authentication
  );
  return { sut, loadAccountByEmail, validateConfirmationToken, confirmEmailToken, authentication };
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

  it('Should return 500 if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmail } = makeSut();
    jest.spyOn(loadAccountByEmail, 'loadByEmail').mockRejectedValueOnce(new Error());
    const httpResponse = await sut.handle({
      email: 'valid_email@mail.com',
      confirmationToken: 'valid_token',
    });
    expect(httpResponse).toEqual(serverError(new Error()));
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

  it('Should return 500 if ValidateConfirmationTokenRepository throws', async () => {
    const { sut, validateConfirmationToken } = makeSut();
    jest.spyOn(validateConfirmationToken, 'validate').mockRejectedValueOnce(new Error());
    const httpResponse = await sut.handle({
      email: 'valid_email@mail.com',
      confirmationToken: 'valid_token',
    });
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('Should call ConfirmEmailTokenRepository with correct values', async () => {
    const { sut, confirmEmailToken } = makeSut();
    const confirmEmailSpy = jest.spyOn(confirmEmailToken, 'confirmEmail');
    await sut.handle({ email: 'valid_email@mail.com', confirmationToken: 'valid_token' });
    expect(confirmEmailSpy).toHaveBeenCalledWith('valid_email@mail.com');
  });

  it('Should return 500 if ConfirmEmailTokenRepository throws', async () => {
    const { sut, confirmEmailToken } = makeSut();
    jest.spyOn(confirmEmailToken, 'confirmEmail').mockRejectedValueOnce(new Error());
    const httpResponse = await sut.handle({
      email: 'valid_email@mail.com',
      confirmationToken: 'valid_token',
    });
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('Should call Authentication with correct values', async () => {
    const { sut, authentication } = makeSut();
    const confirmEmailSpy = jest.spyOn(authentication, 'auth');
    await sut.handle({ email: 'valid_email@mail.com', confirmationToken: 'valid_token' });
    expect(confirmEmailSpy).toHaveBeenCalledWith({ email: 'valid_email@mail.com', password: 'any_password' });
  });

  it('Should return 401 if Authentication returns null', async () => {
    const { sut, authentication } = makeSut();
    jest.spyOn(authentication, 'auth').mockReturnValueOnce(null);
    const httpResponse = await sut.handle({
      email: 'valid_email@mail.com',
      confirmationToken: 'valid_token',
    });
    expect(httpResponse).toEqual(unauthorized());
  });

  it('Should return 200 if Authentication succeeds', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({
      email: 'valid_email@mail.com',
      confirmationToken: 'valid_token',
    });
    expect(httpResponse).toEqual(ok('any_token'));
  });

  it('Should return 500 if Authentication throws', async () => {
    const { sut, authentication } = makeSut();
    jest.spyOn(authentication, 'auth').mockReturnValueOnce(Promise.reject(serverError(new Error())));
    const httpResponse = await sut.handle({
      email: 'valid_email@mail.com',
      confirmationToken: 'valid_token',
    });
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('Should return 401 if confirmationToken is expired', async () => {
    const { sut, loadAccountByEmail } = makeSut();
    const now = new Date();
    const nowToNumber = now.setHours(now.getHours() - 1);
    jest.spyOn(loadAccountByEmail, 'loadByEmail').mockReturnValueOnce(
      Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        confirmedEmail: 'false',
        confirmationToken: 'any_token',
        expirationToken: nowToNumber,
      })
    );
    const httpResponse = await sut.handle({
      email: 'valid_email@mail.com',
      confirmationToken: 'valid_token',
    });
    expect(httpResponse).toEqual(badRequest(new ExpiredTokenError()));
  });
});
