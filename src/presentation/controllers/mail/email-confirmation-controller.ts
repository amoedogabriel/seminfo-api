import { LoadAccountByEmailRepository } from '@data/protocols/db/account';
import { ConfirmEmailTokenRepository, ValidateConfirmationTokenRepository } from '@data/protocols/db/mail';
import { InvalidParamError, UnregisteredEmailError } from '@presentation/errors';
import { badRequest, forbidden } from '@presentation/helper/http/http-helper';
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
    const account = await this.loadAccountByEmailRepository.loadByEmail(email);
    if (!account) {
      return forbidden(new UnregisteredEmailError(email));
    }
    const isValid = await this.validateConfirmationTokenRepository.validate(email, confirmationToken);
    if (!isValid) {
      return badRequest(new InvalidParamError('confirmationToken'));
    }
    await this.confirmEmailTokenRepository.confirmEmail(email);
    return null;
  }
}
