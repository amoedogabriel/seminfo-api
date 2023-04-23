import { LoadAccountByEmailRepository } from '@data/protocols/db/account';
import { EmailConfirmationController } from '@presentation/controllers/mail/email-confirmation-controller';
import { LoadAccountByEmailRepositoryStub } from '@tests/data/test/account';

type SutTypes = {
  sut: EmailConfirmationController;
  loadAccountByEmail: LoadAccountByEmailRepository;
};

const makeSut = (): SutTypes => {
  const loadAccountByEmail = new LoadAccountByEmailRepositoryStub();
  const sut = new EmailConfirmationController(loadAccountByEmail);
  return { sut, loadAccountByEmail };
};

describe('EmailConfirmationController', () => {
  it('Should call LoadAccountByEmail with correct value', async () => {
    const { sut, loadAccountByEmail } = makeSut();
    const loadByEmailSpy = jest.spyOn(loadAccountByEmail, 'loadByEmail');
    await sut.handle({ body: { email: 'valid_email@mail.com' } });
    expect(loadByEmailSpy).toHaveBeenCalledWith('valid_email@mail.com');
  });
});
