export interface ConfirmEmailTokenRepository {
  confirmEmail(email: string): Promise<void>;
}
