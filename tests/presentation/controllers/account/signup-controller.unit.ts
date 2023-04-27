import { AddAccount } from '@domain/use-cases/account';
import { SendEmail, SetEmailConfirmationToken } from '@domain/use-cases/mail';
import { SignUpControler } from '@presentation/controllers/account/signup-controller';
import { MissingParamError, EmailInUseError } from '@presentation/errors';
import { serverError, badRequest, forbidden, noContent } from '@presentation/helper/http/http-helper';
import { Validation } from '@presentation/protocols';
import { makeFakeAccountRequest } from '@tests/helper/account';
import { AddAccountStub, ValidationStub } from '@tests/presentation/test/account';
import { SetEmailConfirmationStub } from '@tests/presentation/test/mail';
import { SendEmailStub } from '@tests/presentation/test/mail/mock-send-email';

type SutTypes = {
  sut: SignUpControler;
  addAccount: AddAccount;
  validation: Validation;
  setEmailConfirmation: SetEmailConfirmationToken;
  sendEmail: SendEmail;
};

const makeSut = (): SutTypes => {
  const addAccount = new AddAccountStub();
  const validation = new ValidationStub();
  const setEmailConfirmation = new SetEmailConfirmationStub();
  const sendEmail = new SendEmailStub();
  const sut = new SignUpControler(addAccount, validation, setEmailConfirmation, sendEmail);
  return { sut, addAccount, validation, setEmailConfirmation, sendEmail };
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
      activated: false,
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

  it('Should call SetEmailConfirmation with correct value', async () => {
    const { sut, setEmailConfirmation } = makeSut();
    const loadByEmailSpy = jest.spyOn(setEmailConfirmation, 'set');
    await sut.handle({ body: { email: 'valid_email@mail.com' } });
    expect(loadByEmailSpy).toHaveBeenCalledWith('valid_email@mail.com');
  });

  it('Should return 204 if SendEmailConfirmation succeeds', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeAccountRequest());
    expect(httpResponse).toEqual(noContent());
  });

  it('Should return 500 if SetEmailConfirmation throws', async () => {
    const { sut, setEmailConfirmation } = makeSut();
    jest.spyOn(setEmailConfirmation, 'set').mockReturnValueOnce(Promise.reject(serverError(new Error())));
    const httpResponse = await sut.handle({ body: { email: 'valid_email@mail.com' } });
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('Should call SendEmailProvider with correct values', async () => {
    const { sut, sendEmail } = makeSut();
    const sendSpy = jest.spyOn(sendEmail, 'send');
    await sut.handle({ body: { email: 'valid_email@mail.com' } });
    expect(sendSpy).toHaveBeenCalledWith('valid_email@mail.com');
  });
});
