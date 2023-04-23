import { ConfirmEmailRepository } from '@data/protocols/db/mail';

export class ConfirmEmailTokenRepositoryStub implements ConfirmEmailRepository {
  async confirmEmail(_email: string): Promise<void> {
    //
  }
}
