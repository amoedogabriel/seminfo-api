import { DbAuthentication } from '@data/use-cases/account';
import { BCryptAdapter } from '@infra/cryptography/bcrypt';
import { JwtAdapter } from '@infra/cryptography/jwt';
import { AccountMongoRepository } from '@infra/db';
import { LoginController } from '@presentation/controllers/login-controller';
import { makeLoginValidationFactory } from '@main/factories/login';
import env from '@main/config/env';

export const makeLoginFactory = () => {
  const salt = 12;
  const authMongo = new AccountMongoRepository();
  const hash = new BCryptAdapter(salt);
  const encrypt = new JwtAdapter(env.secret);
  const validation = makeLoginValidationFactory();
  const authentication = new DbAuthentication(authMongo, authMongo, encrypt, hash);
  return new LoginController(validation, authentication);
};
