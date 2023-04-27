import { SendEmailProvider } from '@data/protocols/mail';
import { SendEmailModel } from '@domain/models/mail/send-email';
import nodemailer from 'nodemailer';
import env from '@main/config/mail-env';

export class MailNodeMailerProvider implements SendEmailProvider {
  async sendEmail(data: SendEmailModel): Promise<void> {
    const { host, port, secure, user, pass, from } = env;
    const transporter = nodemailer.createTransport({
      host: host,
      port: +port,
      secure: !!secure,
      auth: {
        user: user,
        pass: pass,
      },
    });

    await transporter
      .sendMail({
        from: `${from} ${user}`, // sender address
        to: data.email, // list of receivers
        subject: 'Account Confirmation ✔', // Subject line
        text: 'Account Confirmation', // plain text body
        html: `<b>${data.token}</b>`, // html body
      })
      .catch((data) => console.log(data));
  }
}
