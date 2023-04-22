import { LoadAccountByEmailRepository } from '@data/protocols/db/account';
import { DbConfirmEmailToken } from '@data/use-cases/mail';
import { LoadAccountByEmailRepositoryStub } from '@tests/data/test/account';

type SutTypes = {
  sut: DbConfirmEmailToken;
  loadAccountByEmail: LoadAccountByEmailRepository;
};

const makeSut = (): SutTypes => {
  const loadAccountByEmail = new LoadAccountByEmailRepositoryStub();
  const sut = new DbConfirmEmailToken(loadAccountByEmail);
  return { sut, loadAccountByEmail };
};

describe('DbConfirmEmailToken', () => {
  it('Should call LoadAccountByEmailRepository with correct value', async () => {
    const { sut, loadAccountByEmail } = makeSut();
    const loadByEmailSpy = jest.spyOn(loadAccountByEmail, 'loadByEmail');
    await sut.confirm('valid_email@mail.com', 'confirmation_token');
    expect(loadByEmailSpy).toHaveBeenCalledWith('valid_email@mail.com');
  });
});
