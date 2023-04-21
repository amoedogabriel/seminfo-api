export interface SendEmailConfirmation {
  send(email: string): Promise<void>;
}
