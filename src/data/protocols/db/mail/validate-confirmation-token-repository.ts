export interface ValidateConfirmationTokenRepository {
  validate(email: string, token: string): Promise<boolean>;
}
