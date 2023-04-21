export interface SendEmailConfirmationRepository {
  sendEmail(email: string, token: string): Promise<void>;
}
