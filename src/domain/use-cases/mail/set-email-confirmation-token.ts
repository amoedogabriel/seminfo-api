export interface SetEmailConfirmationToken {
  send(email: string): Promise<void>;
}
