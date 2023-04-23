import { LoadAccountByEmailRepository } from '@data/protocols/db/account';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';

export class EmailConfirmationController implements Controller {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository;
  constructor(loadAccountByEmailRepository: LoadAccountByEmailRepository) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email } = httpRequest.body;
    await this.loadAccountByEmailRepository.loadByEmail(email);
    return null;
  }
}
