import { AddAccount, Authentication } from '@domain/use-cases/account';
import { SignUpControler } from '@presentation/controllers/signup-controller';
import { MissingParamError, EmailInUseError } from '@presentation/errors';
import { serverError, badRequest, forbidden, ok } from '@presentation/helper/http/http-helper';
import { Validation } from '@presentation/protocols';
import { makeFakeAccountRequest } from '@tests/helper';
import { AddAccountStub, ValidationStub, AuthenticationStub } from '@tests/presentation/test';

type SutTypes = {
  sut: SignUpControler;
  addAccount: AddAccount;
  validation: Validation;
  authentication: Authentication;
};

const makeSut = (): SutTypes => {
  const addAccount = new AddAccountStub();
  const validation = new ValidationStub();
  const authentication = new AuthenticationStub();
  const sut = new SignUpControler(addAccount, validation, authentication);
  return { sut, addAccount, validation, authentication };
};

describe('SignUpControler', () => {
  it('Should call AddAccount with correct values', async () => {
    const { sut, addAccount } = makeSut();
    const addSpy = jest.spyOn(addAccount, 'add');
    await sut.handle(makeFakeAccountRequest());
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });
  });

  it('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccount } = makeSut();
    jest.spyOn(addAccount, 'add').mockRejectedValueOnce(new Error());
    const httpResponse = await sut.handle(makeFakeAccountRequest());
    expect(httpResponse).toEqual(serverError(httpResponse.body.stack));
  });

  it('Should return 200 if AddAccount succeeds', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeAccountRequest());
    expect(httpResponse).toEqual(ok('any_token'));
  });

  it('Should call Validation with correct values', async () => {
    const { sut, validation } = makeSut();
    const validSpy = jest.spyOn(validation, 'validate');
    const httpRequest = makeFakeAccountRequest();
    await sut.handle(httpRequest);
    expect(validSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  it('Should return 400 if Validation returns an error', async () => {
    const { sut, validation } = makeSut();
    jest.spyOn(validation, 'validate').mockReturnValueOnce(new MissingParamError('field_name'));
    const httpResponse = await sut.handle(makeFakeAccountRequest());
    expect(httpResponse).toEqual(badRequest(new MissingParamError('field_name')));
  });

  it('Should return 403 if AddAccount returns null', async () => {
    const { sut, addAccount } = makeSut();
    jest.spyOn(addAccount, 'add').mockReturnValueOnce(null);
    const account = await sut.handle(makeFakeAccountRequest());
    expect(account).toEqual(forbidden(new EmailInUseError()));
  });

  it('Should call Authentication with correct values', async () => {
    const { sut, authentication } = makeSut();
    const addSpy = jest.spyOn(authentication, 'auth');
    await sut.handle(makeFakeAccountRequest());
    expect(addSpy).toHaveBeenCalledWith({ email: 'any_email@mail.com', password: 'any_password' });
  });

  it('Should return 500 if Authentication throws', async () => {
    const { sut, authentication } = makeSut();
    jest.spyOn(authentication, 'auth').mockReturnValueOnce(Promise.reject(serverError(new Error())));
    const httpResponse = await sut.handle(makeFakeAccountRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
