import { SendEmailProvider } from '@data/protocols/mail';
import { SendEmailModel } from '@domain/models/mail/send-email';
import { SendEmail } from '@domain/use-cases/mail';

export class ServiceSendEmail implements SendEmail {
  private readonly sendEmailProvider: SendEmailProvider;
  constructor(sendEmailProvider: SendEmailProvider) {
    this.sendEmailProvider = sendEmailProvider;
  }
  async send(data: SendEmailModel): Promise<void> {
    await this.sendEmailProvider.sendEmail(data);
  }
}
