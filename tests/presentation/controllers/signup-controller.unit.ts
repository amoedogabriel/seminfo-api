import { AddAccount } from '@domain/use-cases';
import { SignUpControler } from '@presentation/controllers/signup-controller';
import { serveError, ok, badRequest, forbidden } from '@presentation/helper/http/http-helper';
import { Validation } from '@presentation/protocols/validation';
import { AddAccountStub } from '@tests/presentation/test/mock-add-acount';
import { ValidationStub } from '@tests/presentation/test/mock-validation';
import { EmailInUseError, MissingParamError } from '@presentation/errors';
import { makeFakeAccountRequest } from '@tests/helper/make-fake-account-request';

type SutTypes = {
  sut: SignUpControler;
  addAccount: AddAccount;
  validation: Validation;
};

const makeSut = (): SutTypes => {
  const addAccount = new AddAccountStub();
  const validation = new ValidationStub();
  const sut = new SignUpControler(addAccount, validation);
  return { sut, addAccount, validation };
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
    expect(httpResponse).toEqual(serveError(httpResponse.body.stack));
  });

  it('Should return 200 if AddAccount succeeds', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeAccountRequest());
    expect(httpResponse).toEqual(ok(httpResponse.body));
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
});
