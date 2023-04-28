import { AddAccount } from '@domain/use-cases/account';
import { SendEmail, SetToken } from '@domain/use-cases/mail';
import { EmailInUseError } from '@presentation/errors';
import { badRequest, forbidden, noContent, serverError } from '@presentation/helper/http/http-helper';
import { Controller, Validation, HttpRequest, HttpResponse } from '@presentation/protocols';

export class SignUpControler implements Controller {
  private readonly addAccount: AddAccount;
  private readonly validation: Validation;
  private readonly setToken: SetToken;
  private readonly sendEmail: SendEmail;
  constructor(addAccount: AddAccount, validation: Validation, setToken: SetToken, sendEmail: SendEmail) {
    this.addAccount = addAccount;
    this.validation = validation;
    this.setToken = setToken;
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
      const token = await this.setToken.set(email);
      if (token) {
        await this.sendEmail.send({ email, token });
      }
      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
