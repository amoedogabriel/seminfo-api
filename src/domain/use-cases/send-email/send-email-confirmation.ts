import { SendEmailConfirmationModel } from '@domain/models/send-email';

export interface SendEmailConfirmation {
  send(emailData: SendEmailConfirmationModel): Promise<void>;
}
