import { DbAddAccount } from '@data/use-cases';
import { BCryptAdapter } from '@infra/cryptography';
import { AccountMongoRepository } from '@infra/db';
import { SignUpControler } from '@presentation/controllers/signup-controller';
import { makeSignupValidation } from './signup-validation-factory';

export const makeSignupController = (): SignUpControler => {
  const salt = 12;
  const hasher = new BCryptAdapter(salt);
  const addAccountRepository = new AccountMongoRepository();
  const addAcount = new DbAddAccount(hasher, addAccountRepository);
  const validation = makeSignupValidation();
  return new SignUpControler(addAcount, validation);
};
