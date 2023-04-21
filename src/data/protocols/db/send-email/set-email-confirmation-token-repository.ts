export interface SetEmailConfirmationTokenRepository {
  setToken(email: string): Promise<string>;
}
