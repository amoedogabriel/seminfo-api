export class EmailInUseError extends Error {
  constructor() {
    super('Email Already In Use');
    this.name = 'EmailInUseError';
  }
}
