import { SetEmailConfirmationToken } from '@domain/use-cases/mail';
import { noContent, serverError } from '@presentation/helper/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';

export class EmailConfirmationController implements Controller {
  private readonly setEmailConfirmation: SetEmailConfirmationToken;
  constructor(setEmailConfirmation: SetEmailConfirmationToken) {
    this.setEmailConfirmation = setEmailConfirmation;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email } = httpRequest.body;
      await this.setEmailConfirmation.set(email);
      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
