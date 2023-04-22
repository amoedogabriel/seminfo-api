import { SendEmailConfirmationRepository } from '@data/protocols/db/account';
import { SetEmailConfirmationTokenRepository } from '@data/protocols/db/mail';
import { MongoHelper } from '@infra/helper';
import { randomUUID } from 'crypto';
import nodemailer from 'nodemailer';
import env from '@main/config/mail-env';

const { host, port, user, pass } = env;

export class EmailMongoRepository
  implements SetEmailConfirmationTokenRepository, SendEmailConfirmationRepository
{
  async setToken(email: string): Promise<string> {
    const token = randomUUID();
    const now = new Date();
    const expirationToken = now.setHours(now.getHours()) + 1;
    const accountCollection = await MongoHelper.getCollection('account');
    await accountCollection.updateOne(
      { email },
      {
        $set: {
          confirmationToken: token,
          expirationToken,
        },
      }
    );
    return token;
  }

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
