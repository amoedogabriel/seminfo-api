import { AddAccount } from '@domain/use-cases';
import { SignUpControler } from '@presentation/controllers/signup-controller';
import { serveError, ok } from '@presentation/helper/http/http-helper';
import { makeFakeAddAccountData } from '@tests/helper/make-fake-add-account-data';
import { AddAccountStub } from '@tests/presentation/test/mock-add-acount';

const addAccountBody = {
  body: makeFakeAddAccountData(),
};

type SutTypes = {
  sut: SignUpControler;
  addAccount: AddAccount;
};

const makeSut = (): SutTypes => {
  const addAccount = new AddAccountStub();
  const sut = new SignUpControler(addAccount);
  return { sut, addAccount };
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
});
