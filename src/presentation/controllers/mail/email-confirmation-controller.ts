import { LoadAccountByEmailRepository } from '@data/protocols/db/account';
import { ConfirmEmailTokenRepository, ValidateConfirmationTokenRepository } from '@data/protocols/db/mail';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';

export class EmailConfirmationController implements Controller {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository;
  private readonly validateConfirmationTokenRepository: ValidateConfirmationTokenRepository;
  private readonly confirmEmailTokenRepository: ConfirmEmailTokenRepository;
  constructor(
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    validateConfirmationTokenRepository: ValidateConfirmationTokenRepository,
    confirmEmailTokenRepository: ConfirmEmailTokenRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.validateConfirmationTokenRepository = validateConfirmationTokenRepository;
    this.confirmEmailTokenRepository = confirmEmailTokenRepository;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, confirmationToken } = httpRequest;
    await this.loadAccountByEmailRepository.loadByEmail(email);
    await this.validateConfirmationTokenRepository.validate(email, confirmationToken);
    await this.confirmEmailTokenRepository.confirmEmail(email);
    return null;
  }
}
