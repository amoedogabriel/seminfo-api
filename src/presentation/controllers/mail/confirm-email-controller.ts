import { LoadAccountByEmailRepository } from '@data/protocols/db/account';
import { ConfirmEmailRepository, ValidateEmailTokenRepository } from '@data/protocols/db/mail';
import { Authentication } from '@domain/use-cases/account';
import { InvalidParamError, UnregisteredEmailError, ExpiredTokenError } from '@presentation/errors';
import { badRequest, forbidden, ok, serverError, unauthorized } from '@presentation/helper/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';

export class ConfirmEmailController implements Controller {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository;
  private readonly validateEmailTokenRepository: ValidateEmailTokenRepository;
  private readonly confirmEmailTokenRepository: ConfirmEmailRepository;
  private readonly authentication: Authentication;
  constructor(
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    validateEmailTokenRepository: ValidateEmailTokenRepository,
    confirmEmailTokenRepository: ConfirmEmailRepository,
    authentication: Authentication
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.validateEmailTokenRepository = validateEmailTokenRepository;
    this.confirmEmailTokenRepository = confirmEmailTokenRepository;
    this.authentication = authentication;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const now = new Date();
      const nowToNumber = now.setHours(now.getHours());
      const { email, confirmationToken } = httpRequest.body;

      const account = await this.loadAccountByEmailRepository.loadByEmail(email);
      if (!account) {
        return forbidden(new UnregisteredEmailError(email));
      }
      const isValid = await this.validateEmailTokenRepository.validate({
        email,
        token: confirmationToken,
      });
      if (!isValid) {
        return badRequest(new InvalidParamError('confirmationToken'));
      }
      if (nowToNumber > account.expirationToken) {
        return badRequest(new ExpiredTokenError());
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
