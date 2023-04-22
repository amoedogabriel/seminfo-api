import { SendEmailConfirmationRepository } from '@data/protocols/db/account';
import nodemailer from 'nodemailer';

export class SendEmailConfirmationAdapter implements SendEmailConfirmationRepository {
  async sendEmail(email: string, token: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'claudie.mills@ethereal.email',
        pass: 'eN2WNCssXeZ37ChgjB',
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
