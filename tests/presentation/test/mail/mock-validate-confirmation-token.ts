import { ValidateEmailTokenRepository } from '@data/protocols/db/mail';
import { ConfirmEmailModel } from '@domain/models/mail';

export class ValidateEmailTokenRepositoryStub implements ValidateEmailTokenRepository {
  async validate(_data: ConfirmEmailModel): Promise<boolean> {
    return true;
  }
}
