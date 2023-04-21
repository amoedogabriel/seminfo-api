import { Authentication } from '@domain/use-cases';
import { Controller, HttpRequest, HttpResponse, Validation } from '@presentation/protocols';

export class LoginController implements Controller {
  private readonly validation: Validation;
  private readonly authentication: Authentication;
  constructor(validation: Validation, authentication: Authentication) {
    this.validation = validation;
    this.authentication = authentication;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body);
    const { email, password } = httpRequest.body;
    await this.authentication.auth({ email, password });
    return null;
  }
}
