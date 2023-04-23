export class UnregisteredEmailError extends Error {
  constructor(paramName: string) {
    super(`Unregistered email: ${paramName}`);
    this.name = 'UnregisteredEmailError';
  }
}
