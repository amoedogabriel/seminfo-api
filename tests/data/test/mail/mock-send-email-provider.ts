import { SendEmailProvider } from '@data/protocols/mail';
import { SendEmailModel } from '@domain/models/mail/send-email';

export class SendEmailProviderStub implements SendEmailProvider {
  async sendEmail(_data: SendEmailModel): Promise<void> {
    //
  }
}
