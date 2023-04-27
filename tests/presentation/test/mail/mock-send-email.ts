import { SendEmailModel } from '@domain/models/mail/send-email';
import { SendEmail } from '@domain/use-cases/mail';

export class SendEmailStub implements SendEmail {
  async send(_data: SendEmailModel): Promise<void> {
    //
  }
}
