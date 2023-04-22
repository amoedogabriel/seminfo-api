export interface SendEmailConfirmation {
  sendEmail(email: string, token: string): Promise<void>;
}
