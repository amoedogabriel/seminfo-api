export interface ConfirmEmailToken {
  confirm(email: string, token: string): Promise<void>;
}
