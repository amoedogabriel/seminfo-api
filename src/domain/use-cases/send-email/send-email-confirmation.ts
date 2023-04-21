import { SendEmailConfirmationModel } from '@domain/models/send-email';

export interface SendEmailConfirmation {
  send(sendEmail: SendEmailConfirmationModel): Promise<void>;
}
