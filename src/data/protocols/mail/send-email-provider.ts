import { SendEmailModel } from '@domain/models/mail/send-email';

export interface SendEmailProvider {
  sendEmail(data: SendEmailModel): Promise<void>;
}
