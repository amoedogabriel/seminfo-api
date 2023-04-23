import { ConfirmEmailModel } from '@domain/models/mail';

export interface ConfirmEmail {
  confirm(data: ConfirmEmailModel): Promise<void>;
}
