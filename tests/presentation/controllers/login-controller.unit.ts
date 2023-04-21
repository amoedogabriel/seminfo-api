import { LoginController } from '@presentation/controllers/login-controller';
import { Validation } from '@presentation/protocols';
import { ValidationStub } from '../test';
import { makeFakeAuthenticationRequest } from '@tests/helper';

type SutTypes = {
  sut: LoginController;
  validation: Validation;
};

const makeSut = (): SutTypes => {
  const validation = new ValidationStub();
  const sut = new LoginController(validation);
  return { sut, validation };
};

describe('LoginController', () => {
  it('Should call Validation with correct values', async () => {
    const { sut, validation } = makeSut();
    const validationSpy = jest.spyOn(validation, 'validate');
    await sut.handle(makeFakeAuthenticationRequest());
    expect(validationSpy).toHaveBeenCalledWith(makeFakeAuthenticationRequest().body);
  });
});
