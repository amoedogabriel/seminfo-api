export interface SetEmailConfirmationToken {
  set(email: string): Promise<void>;
}
