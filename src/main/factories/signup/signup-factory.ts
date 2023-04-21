import { DbAddAccount, DbAuthentication } from '@data/use-cases';
import { AccountMongoRepository } from '@infra/db';
import { SignUpControler } from '@presentation/controllers/signup-controller';
import { makeSignupValidation } from '@main/factories/signup';
import { JwtAdapter } from '@infra/cryptography/jwt';
import { BCryptAdapter } from '@infra/cryptography/bcrypt';
import env from '@main/config/env';

export const makeSignupController = (): SignUpControler => {
  const salt = 12;
  const hasher = new BCryptAdapter(salt);
  const encrypter = new JwtAdapter(env.secret);
  const accountMongo = new AccountMongoRepository();
  const addAcount = new DbAddAccount(hasher, accountMongo, accountMongo);
  const validation = makeSignupValidation();
  const authentication = new DbAuthentication(accountMongo, accountMongo, encrypter, hasher);
  return new SignUpControler(addAcount, validation, authentication);
};
