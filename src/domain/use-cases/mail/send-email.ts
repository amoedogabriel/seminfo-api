import { SendEmailModel } from '@domain/models/mail/send-email';

export interface SendEmail {
  send(data: SendEmailModel): Promise<void>;
}
