import { ConfirmEmailModel } from '@domain/models/mail';

export interface ValidateEmailTokenRepository {
  validate(data: ConfirmEmailModel): Promise<boolean>;
}
