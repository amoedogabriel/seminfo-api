import { DbAddAccount, DbAuthentication } from '@data/use-cases';
import { AccountMongoRepository } from '@infra/db';
import { SignUpControler } from '@presentation/controllers/signup-controller';
import { makeSignupValidation } from '@main/factories/signup';
import { JwtAdapter } from '@infra/cryptography/jwt';
import { BCryptAdapter } from '@infra/cryptography/bcrypt';

export const makeSignupController = (): SignUpControler => {
  const salt = 12;
  const hasher = new BCryptAdapter(salt);
  const encrypter = new JwtAdapter(process.env.SECRET);
  const addAccountRepository = new AccountMongoRepository();
  const loadAccountByEmail = new AccountMongoRepository();
  const updateAcessToken = new AccountMongoRepository();
  const addAcount = new DbAddAccount(hasher, addAccountRepository, loadAccountByEmail);
  const validation = makeSignupValidation();
  const authentication = new DbAuthentication(loadAccountByEmail, updateAcessToken, encrypter, hasher);
  return new SignUpControler(addAcount, validation, authentication);
};
