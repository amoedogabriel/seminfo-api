import { AddAccount } from '@domain/use-cases/account';
import { SetEmailConfirmationToken } from '@domain/use-cases/mail';
import { SignUpControler } from '@presentation/controllers/account/signup-controller';
import { MissingParamError, EmailInUseError } from '@presentation/errors';
import { serverError, badRequest, forbidden, noContent } from '@presentation/helper/http/http-helper';
import { Validation } from '@presentation/protocols';
import { makeFakeAccountRequest } from '@tests/helper/account';
import { AddAccountStub, ValidationStub } from '@tests/presentation/test/account';
import { SetEmailConfirmationStub } from '@tests/presentation/test/mail';

type SutTypes = {
  sut: SignUpControler;
  addAccount: AddAccount;
  validation: Validation;
  sendEmailConfirmation: SetEmailConfirmationToken;
};

const makeSut = (): SutTypes => {
  const addAccount = new AddAccountStub();
  const validation = new ValidationStub();
  const sendEmailConfirmation = new SetEmailConfirmationStub();
  const sut = new SignUpControler(addAccount, validation, sendEmailConfirmation);
  return { sut, addAccount, validation, sendEmailConfirmation };
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

  it('Should call SendEmailConfirmation with correct value', async () => {
    const { sut, sendEmailConfirmation } = makeSut();
    const loadByEmailSpy = jest.spyOn(sendEmailConfirmation, 'send');
    await sut.handle({ body: { email: 'valid_email@mail.com' } });
    expect(loadByEmailSpy).toHaveBeenCalledWith('valid_email@mail.com');
  });

  it('Should return 204 if SendEmailConfirmation succeeds', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeAccountRequest());
    expect(httpResponse).toEqual(noContent());
  });

  it('Should return 500 if SendEmailConfirmation throws', async () => {
    const { sut, sendEmailConfirmation } = makeSut();
    jest.spyOn(sendEmailConfirmation, 'send').mockReturnValueOnce(Promise.reject(serverError(new Error())));
    const httpResponse = await sut.handle({ body: { email: 'valid_email@mail.com' } });
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
