import { Controller, HttpRequest, HttpResponse, Validation } from '@presentation/protocols';

export class LoginController implements Controller {
  private readonly validation: Validation;
  constructor(validation: Validation) {
    this.validation = validation;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body);
    return null;
  }
}
