import { AddAccount } from '@domain/use-cases';
import { SignUpControler } from '@presentation/controllers/signup-controller';
import { serveError, ok, badRequest } from '@presentation/helper/http/http-helper';
import { Validation } from '@presentation/protocols/validation';
import { makeFakeAddAccountData } from '@tests/helper/make-fake-add-account-data';
import { AddAccountStub } from '@tests/presentation/test/mock-add-acount';
import { ValidationStub } from '@tests/presentation/test/mock-validation';
import { MissingParamError } from '@presentation/errors';

const addAccountBody = {
  body: makeFakeAddAccountData(),
};

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
    await sut.handle(addAccountBody);
    expect(addSpy).toHaveBeenCalledWith(makeFakeAddAccountData());
  });

  it('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccount } = makeSut();
    jest.spyOn(addAccount, 'add').mockRejectedValueOnce(new Error());
    const httpResponse = await sut.handle(addAccountBody);
    expect(httpResponse).toEqual(serveError(httpResponse.body.stack));
  });

  it('Should return 200 if AddAccount succeeds', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(addAccountBody);
    expect(httpResponse).toEqual(ok(httpResponse.body));
  });

  it('Should call Validation with correct values', async () => {
    const { sut, validation } = makeSut();
    const validSpy = jest.spyOn(validation, 'validate');
    await sut.handle(addAccountBody);
    expect(validSpy).toHaveBeenCalledWith(makeFakeAddAccountData());
  });
});
