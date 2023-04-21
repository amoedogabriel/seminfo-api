import { Authentication } from '@domain/use-cases';
import { badRequest, serverError } from '@presentation/helper/http/http-helper';
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
      await this.authentication.auth({ email, password });
      return null;
    } catch (error) {
      return serverError(error);
    }
  }
}
