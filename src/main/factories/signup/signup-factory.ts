import { DbAddAccount } from '../../../data/use-cases/db-add-account';
import { BCryptAdapter } from '../../../infra/cryptography/bcrypt-adapter';
import { AccountMongoRepository } from '../../../infra/db/account-mongo-repository';
import { SignUpControler } from '../../../presentation/controllers/signup-controller';

export const makeSignupController = (): SignUpControler => {
  const salt = 12;
  const hasher = new BCryptAdapter(salt);
  const addAccountRepository = new AccountMongoRepository();
  const addAcount = new DbAddAccount(hasher, addAccountRepository);
  return new SignUpControler(addAcount);
};
