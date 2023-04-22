import { LoadAccountByEmailRepository } from '@data/protocols/db/account';
import { ConfirmEmailTokenRepository } from '@data/protocols/db/mail';
import { DbConfirmEmailToken } from '@data/use-cases/mail';
import { AccountModel } from '@domain/models/account';
import { ConfirmEmailTokenRepositoryStub } from '@tests/data/test/mail';

class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
  async loadByEmail(_email: string): Promise<AccountModel> {
    const now = new Date();
    const expirationToken = now.setHours(now.getHours()) + 1;
    return {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      confirmationToken: 'confirmation_token',
      expirationToken,
    };
  }
}

type SutTypes = {
  sut: DbConfirmEmailToken;
  loadAccountByEmail: LoadAccountByEmailRepository;
  confirmEmailToken: ConfirmEmailTokenRepository;
};

const makeSut = (): SutTypes => {
  const loadAccountByEmail = new LoadAccountByEmailRepositoryStub();
  const confirmEmailToken = new ConfirmEmailTokenRepositoryStub();
  const sut = new DbConfirmEmailToken(loadAccountByEmail, confirmEmailToken);
  return { sut, loadAccountByEmail, confirmEmailToken };
};

describe('DbConfirmEmailToken', () => {
  it('Should call LoadAccountByEmailRepository with correct value', async () => {
    const { sut, loadAccountByEmail } = makeSut();
    const loadByEmailSpy = jest.spyOn(loadAccountByEmail, 'loadByEmail');
    await sut.confirm('valid_email@mail.com', 'confirmation_token');
    expect(loadByEmailSpy).toHaveBeenCalledWith('valid_email@mail.com');
  });

  it('Should call ConfirmEmailTokenRepository with correct value', async () => {
    const { sut, confirmEmailToken } = makeSut();
    const loadByEmailSpy = jest.spyOn(confirmEmailToken, 'confirmEmail');
    await sut.confirm('valid_email@mail.com', 'confirmation_token');
    expect(loadByEmailSpy).toHaveBeenCalledWith('valid_email@mail.com');
  });

  it('Should not call ConfirmEmailTokenRepository if account is null', async () => {
    const { sut, loadAccountByEmail, confirmEmailToken } = makeSut();
    jest.spyOn(loadAccountByEmail, 'loadByEmail').mockReturnValueOnce(Promise.resolve(null));
    const confirmEmailSpy = jest.spyOn(confirmEmailToken, 'confirmEmail');
    await sut.confirm('valid_email@mail.com', 'confirmation_token');
    expect(confirmEmailSpy).not.toHaveBeenCalled();
  });

  it('Should not call ConfirmEmailTokenRepository if token is expired', async () => {
    const { sut, loadAccountByEmail, confirmEmailToken } = makeSut();
    const now = new Date();
    const expirationToken = now.setHours(now.getHours()) - 1;
    jest.spyOn(loadAccountByEmail, 'loadByEmail').mockReturnValueOnce(
      Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        confirmationToken: 'confirmation_token',
        expirationToken,
      })
    );
    const confirmEmailSpy = jest.spyOn(confirmEmailToken, 'confirmEmail');
    await sut.confirm('valid_email@mail.com', 'confirmation_token');
    expect(confirmEmailSpy).not.toHaveBeenCalled();
  });

  it('Should not call ConfirmEmailTokenRepository if token is invalid', async () => {
    const { sut, loadAccountByEmail, confirmEmailToken } = makeSut();
    const now = new Date();
    const expirationToken = now.setHours(now.getHours()) + 1;
    jest.spyOn(loadAccountByEmail, 'loadByEmail').mockReturnValueOnce(
      Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        confirmationToken: 'confirmation_token',
        expirationToken,
      })
    );
    const confirmEmailSpy = jest.spyOn(confirmEmailToken, 'confirmEmail');
    await sut.confirm('valid_email@mail.com', 'other_token');
    expect(confirmEmailSpy).not.toHaveBeenCalled();
  });
});
