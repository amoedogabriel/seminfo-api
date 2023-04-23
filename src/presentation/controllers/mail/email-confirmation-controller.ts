import { LoadAccountByEmailRepository } from '@data/protocols/db/account';
import { ConfirmEmailTokenRepository, ValidateConfirmationTokenRepository } from '@data/protocols/db/mail';
import { Authentication } from '@domain/use-cases/account';
import { InvalidParamError, UnregisteredEmailError } from '@presentation/errors';
import { badRequest, forbidden, ok, serverError, unauthorized } from '@presentation/helper/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';

export class EmailConfirmationController implements Controller {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository;
  private readonly validateConfirmationTokenRepository: ValidateConfirmationTokenRepository;
  private readonly confirmEmailTokenRepository: ConfirmEmailTokenRepository;
  private readonly authentication: Authentication;
  constructor(
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    validateConfirmationTokenRepository: ValidateConfirmationTokenRepository,
    confirmEmailTokenRepository: ConfirmEmailTokenRepository,
    authentication: Authentication
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.validateConfirmationTokenRepository = validateConfirmationTokenRepository;
    this.confirmEmailTokenRepository = confirmEmailTokenRepository;
    this.authentication = authentication;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
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
      const accessToken = await this.authentication.auth({ email, password: account.password });
      if (!accessToken) {
        return unauthorized();
      }
      return ok(accessToken);
    } catch (error) {
      return serverError(error);
    }
  }
}
