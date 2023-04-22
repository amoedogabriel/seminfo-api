import { Authentication } from '@domain/use-cases/account';
import { badRequest, serverError, ok, unauthorized } from '@presentation/helper/http/http-helper';
import { Controller, HttpRequest, HttpResponse, Validation } from '@presentation/protocols';

export class LoginController implements Controller {
  private readonly validation: Validation;
  private readonly authentication: Authentication;
  constructor(validation: Validation, authentication: Authentication) {
    this.validation = validation;
    this.authentication = authentication;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validateError = this.validation.validate(httpRequest.body);
      if (validateError) {
        return badRequest(validateError);
      }
      const { email, password } = httpRequest.body;
      const accessToken = await this.authentication.auth({ email, password });
      if (!accessToken) {
        return unauthorized();
      }
      return ok(accessToken);
    } catch (error) {
      return serverError(error);
    }
  }
}
