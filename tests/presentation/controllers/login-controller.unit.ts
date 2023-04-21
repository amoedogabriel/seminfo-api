import { LoginController } from '@presentation/controllers/login-controller';
import { Validation } from '@presentation/protocols';
import { AuthenticationStub, ValidationStub } from '../test';
import { makeFakeAuthenticationRequest } from '@tests/helper';
import { Authentication } from '@domain/use-cases';

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

  it('Should call Authentication with correct values', async () => {
    const { sut, authentication } = makeSut();
    const authenticationSpy = jest.spyOn(authentication, 'auth');
    await sut.handle(makeFakeAuthenticationRequest());
    expect(authenticationSpy).toHaveBeenCalledWith(makeFakeAuthenticationRequest().body);
  });
});
