import { DbAddAccount } from '@data/use-cases/account';
import { AccountMongoRepository } from '@infra/db';
import { SignUpControler } from '@presentation/controllers/signup-controller';
import { makeSignupValidation } from '@main/factories/signup';
import { BCryptAdapter } from '@infra/cryptography/bcrypt';
import { DbSendEmailConfirmation } from '@data/use-cases/mail';
import { EmailMongoRepository } from '@infra/db/email-mongo-repository';
import { SendEmailConfirmationAdapter } from '@infra/mail/send-email-adapter';

export const makeSignupController = (): SignUpControler => {
  const salt = 12;
  const hasher = new BCryptAdapter(salt);
  const accountMongo = new AccountMongoRepository();
  const sendMongo = new EmailMongoRepository();
  const sendEmailConfirmationAdapter = new SendEmailConfirmationAdapter();
  const addAcount = new DbAddAccount(hasher, accountMongo, accountMongo);
  const validation = makeSignupValidation();
  const sendEmailConfirmation = new DbSendEmailConfirmation(
    accountMongo,
    sendMongo,
    sendEmailConfirmationAdapter
  );
  return new SignUpControler(addAcount, validation, sendEmailConfirmation);
};
