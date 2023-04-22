import { AddAccount } from '@domain/use-cases/account';
import { SendEmailConfirmation } from '@domain/use-cases/mail';
import { EmailInUseError } from '@presentation/errors';
import { badRequest, forbidden, noContent, serverError } from '@presentation/helper/http/http-helper';
import { Controller, Validation, HttpRequest, HttpResponse } from '@presentation/protocols';

export class SignUpControler implements Controller {
  private readonly addAccount: AddAccount;
  private readonly validation: Validation;
  private readonly sendEmailConfirmation: SendEmailConfirmation;
  constructor(addAccount: AddAccount, validation: Validation, sendEmailConfirmation: SendEmailConfirmation) {
    this.addAccount = addAccount;
    this.validation = validation;
    this.sendEmailConfirmation = sendEmailConfirmation;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validateError = this.validation.validate(httpRequest.body);
      if (validateError) {
        return badRequest(validateError);
      }
      const { name, email, password } = httpRequest.body;
      const account = await this.addAccount.add({ name, email, password });
      if (!account) {
        return forbidden(new EmailInUseError());
      }
      await this.sendEmailConfirmation.send(email);
      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
