import { SendEmailConfirmation } from '@data/protocols/mail';
import nodemailer from 'nodemailer';
import env from '@main/config/mail-env';
const { host, port, user, pass } = env;

export class NodeMailerAdapter implements SendEmailConfirmation {
  async sendEmail(email: string, token: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: host,
      port: +port,
      auth: {
        user: user,
        pass: pass,
      },
    });

    await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: email, // list of receivers
      subject: 'Account Confirmation ✔', // Subject line
      text: 'Account Confirmation', // plain text body
      html: `<b>${token}</b>`, // html body
    });
  }
}
