import { UpdateAccessTokenRepository } from '@data/protocols/db';

export class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
  async updateAccessToken(_email: string, _token: string): Promise<void> {
    //
  }
}
