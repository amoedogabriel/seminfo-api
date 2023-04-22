import { DbAddAccount, DbAuthentication } from '@data/use-cases/account';
import { AccountMongoRepository } from '@infra/db';
import { SignUpControler } from '@presentation/controllers/signup-controller';
import { makeSignupValidation } from '@main/factories/signup';
import { JwtAdapter } from '@infra/cryptography/jwt';
import { BCryptAdapter } from '@infra/cryptography/bcrypt';
import mongoEnv from '@main/config/mongo-env';

export const makeSignupController = (): SignUpControler => {
  const salt = 12;
  const hasher = new BCryptAdapter(salt);
  const encrypter = new JwtAdapter(mongoEnv.secret);
  const accountMongo = new AccountMongoRepository();
  const addAcount = new DbAddAccount(hasher, accountMongo, accountMongo);
  const validation = makeSignupValidation();
  const authentication = new DbAuthentication(accountMongo, accountMongo, encrypter, hasher);
  return new SignUpControler(addAcount, validation, authentication);
};
