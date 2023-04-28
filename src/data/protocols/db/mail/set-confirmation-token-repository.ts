export interface SetConfirmationTokenRepository {
  setToken(email: string): Promise<string>;
}
