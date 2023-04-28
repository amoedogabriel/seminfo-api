import { DbAddAccount } from '@data/use-cases/account';
import { DbSetToken, ServiceSendEmail } from '@data/use-cases/mail';
import { BCryptAdapter } from '@infra/cryptography/bcrypt';
import { AccountMongoRepository } from '@infra/db/account';
import { EmailMongoRepository } from '@infra/db/mail';
import { SignUpControler } from '@presentation/controllers/account/signup-controller';
import { makeSignupValidation } from '@main/factories/signup';
import { MailNodeMailerProvider } from '@infra/mail/mail-nodemailer-provider';

export const makeSignupController = (): SignUpControler => {
  const salt = 12;
  const hasher = new BCryptAdapter(salt);
  const accountMongo = new AccountMongoRepository();
  const sendMongo = new EmailMongoRepository();
  const sendEmailProvider = new MailNodeMailerProvider();
  const sendEmail = new ServiceSendEmail(sendEmailProvider);
  const addAcount = new DbAddAccount(hasher, accountMongo, accountMongo);
  const validation = makeSignupValidation();
  const setEmailConfirmation = new DbSetToken(accountMongo, sendMongo);
  return new SignUpControler(addAcount, validation, setEmailConfirmation, sendEmail);
};
