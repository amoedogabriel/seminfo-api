import { SetEmailConfirmationToken } from '@domain/use-cases/mail';
import { noContent, serverError } from '@presentation/helper/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';

export class EmailConfirmationController implements Controller {
  private readonly sendEmailConfirmation: SetEmailConfirmationToken;
  constructor(sendEmailConfirmation: SetEmailConfirmationToken) {
    this.sendEmailConfirmation = sendEmailConfirmation;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email } = httpRequest.body;
      await this.sendEmailConfirmation.send(email);
      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
