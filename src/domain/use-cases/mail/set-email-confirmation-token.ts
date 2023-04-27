export interface SetEmailConfirmationToken {
  set(email: string): Promise<string>;
}
