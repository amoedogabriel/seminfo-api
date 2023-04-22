import { DbAddAccount } from '@data/use-cases/account';
import { DbSetEmailConfirmationToken } from '@data/use-cases/mail';
import { BCryptAdapter } from '@infra/cryptography/bcrypt';
import { AccountMongoRepository } from '@infra/db/account';
import { EmailMongoRepository } from '@infra/db/mail';
import { SignUpControler } from '@presentation/controllers/account/signup-controller';
import { makeSignupValidation } from '@main/factories/signup';

export const makeSignupController = (): SignUpControler => {
  const salt = 12;
  const hasher = new BCryptAdapter(salt);
  const accountMongo = new AccountMongoRepository();
  const sendMongo = new EmailMongoRepository();
  const sendEmailConfirmationAdapter = new EmailMongoRepository();
  const addAcount = new DbAddAccount(hasher, accountMongo, accountMongo);
  const validation = makeSignupValidation();
  const sendEmailConfirmation = new DbSetEmailConfirmationToken(
    accountMongo,
    sendMongo,
    sendEmailConfirmationAdapter
  );
  return new SignUpControler(addAcount, validation, sendEmailConfirmation);
};
