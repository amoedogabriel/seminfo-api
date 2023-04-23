import { LoadAccountByEmailRepository } from '@data/protocols/db/account';
import { ValidateConfirmationTokenRepository } from '@data/protocols/db/mail';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';

export class EmailConfirmationController implements Controller {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository;
  private readonly validateConfirmationTokenRepository: ValidateConfirmationTokenRepository;
  constructor(
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    validateConfirmationTokenRepository: ValidateConfirmationTokenRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.validateConfirmationTokenRepository = validateConfirmationTokenRepository;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, confirmationToken } = httpRequest;
    await this.loadAccountByEmailRepository.loadByEmail(email);
    await this.validateConfirmationTokenRepository.validate(email, confirmationToken);
    return null;
  }
}
