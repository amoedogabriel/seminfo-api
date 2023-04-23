export interface ConfirmEmailRepository {
  confirmEmail(email: string): Promise<void>;
}
