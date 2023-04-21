import { LoginController } from '@presentation/controllers/login-controller';
import { Validation } from '@presentation/protocols';
import { AuthenticationStub, ValidationStub } from '../test';
import { makeFakeAuthenticationRequest } from '@tests/helper';
import { Authentication } from '@domain/use-cases';
import { MissingParamError } from '@presentation/errors';
import { badRequest, serverError } from '@presentation/helper/http/http-helper';

type SutTypes = {
  sut: LoginController;
  validation: Validation;
  authentication: Authentication;
};

const makeSut = (): SutTypes => {
  const validation = new ValidationStub();
  const authentication = new AuthenticationStub();
  const sut = new LoginController(validation, authentication);
  return { sut, validation, authentication };
};

describe('LoginController', () => {
  it('Should call Validation with correct values', async () => {
    const { sut, validation } = makeSut();
    const validationSpy = jest.spyOn(validation, 'validate');
    await sut.handle(makeFakeAuthenticationRequest());
    expect(validationSpy).toHaveBeenCalledWith(makeFakeAuthenticationRequest().body);
  });

  it('Should return 400 if Validation returns an error', async () => {
    const { sut, validation } = makeSut();
    jest.spyOn(validation, 'validate').mockReturnValueOnce(new MissingParamError('field_name'));
    const httpResponse = await sut.handle(makeFakeAuthenticationRequest());
    expect(httpResponse).toEqual(badRequest(new MissingParamError('field_name')));
  });

  it('Should call Authentication with correct values', async () => {
    const { sut, authentication } = makeSut();
    const authenticationSpy = jest.spyOn(authentication, 'auth');
    await sut.handle(makeFakeAuthenticationRequest());
    expect(authenticationSpy).toHaveBeenCalledWith(makeFakeAuthenticationRequest().body);
  });

  it('Should return 500 if Authentication throws', async () => {
    const { sut, authentication } = makeSut();
    jest.spyOn(authentication, 'auth').mockReturnValueOnce(Promise.reject(serverError(new Error())));
    const httpResponse = await sut.handle(makeFakeAuthenticationRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
