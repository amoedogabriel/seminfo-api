import { AddAccount } from '@domain/use-cases/account';
import { SetEmailConfirmationToken } from '@domain/use-cases/mail';
import { EmailInUseError } from '@presentation/errors';
import { badRequest, forbidden, noContent, serverError } from '@presentation/helper/http/http-helper';
import { Controller, Validation, HttpRequest, HttpResponse } from '@presentation/protocols';

export class SignUpControler implements Controller {
  private readonly addAccount: AddAccount;
  private readonly validation: Validation;
  private readonly setEmailConfirmation: SetEmailConfirmationToken;
  constructor(
    addAccount: AddAccount,
    validation: Validation,
    setEmailConfirmation: SetEmailConfirmationToken
  ) {
    this.addAccount = addAccount;
    this.validation = validation;
    this.setEmailConfirmation = setEmailConfirmation;
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
      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
