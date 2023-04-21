import { SendEmailConfirmationModel } from '@domain/models/send-email';

export interface SendEmailConfirmationRepository {
  sendEmail(sendEmail: SendEmailConfirmationModel): Promise<void>;
}
