import { SendEmailConfirmation } from '@domain/use-cases/send-email';
import { noContent, serverError } from '@presentation/helper/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';

export class EmailConfirmationController implements Controller {
  private readonly sendEmailConfirmation: SendEmailConfirmation;
  constructor(sendEmailConfirmation: SendEmailConfirmation) {
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
