import { AddAccount } from '@domain/use-cases/account';
import { SendEmail, SetEmailConfirmationToken } from '@domain/use-cases/mail';
import { EmailInUseError } from '@presentation/errors';
import { badRequest, forbidden, noContent, serverError } from '@presentation/helper/http/http-helper';
import { Controller, Validation, HttpRequest, HttpResponse } from '@presentation/protocols';

export class SignUpControler implements Controller {
  private readonly addAccount: AddAccount;
  private readonly validation: Validation;
  private readonly setEmailConfirmation: SetEmailConfirmationToken;
  private readonly sendEmail: SendEmail;
  constructor(
    addAccount: AddAccount,
    validation: Validation,
    setEmailConfirmation: SetEmailConfirmationToken,
    sendEmail: SendEmail
  ) {
    this.addAccount = addAccount;
    this.validation = validation;
    this.setEmailConfirmation = setEmailConfirmation;
    this.sendEmail = sendEmail;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validateError = this.validation.validate(httpRequest.body);
      if (validateError) {
        return badRequest(validateError);
      }
      const { name, email, password } = httpRequest.body;
      const account = await this.addAccount.add({ name, email, password, activated: false });
      if (!account) {
        return forbidden(new EmailInUseError());
      }
      await this.setEmailConfirmation.set(email);
      await this.sendEmail.send(email);
      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
