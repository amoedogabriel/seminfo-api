export class ServeError extends Error {
  constructor(stack: string) {
    super('Internal server error');
    this.name = 'ServeError';
    this.stack = stack;
  }
}
