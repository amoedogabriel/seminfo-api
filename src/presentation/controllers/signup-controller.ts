import { AddAccount, Authentication } from '@domain/use-cases';
import { EmailInUseError } from '@presentation/errors';
import { badRequest, forbidden, serverError, ok } from '@presentation/helper/http/http-helper';
import { Controller, Validation, HttpRequest, HttpResponse } from '@presentation/protocols';

export class SignUpControler implements Controller {
  private readonly addAccount: AddAccount;
  private readonly validation: Validation;
  private readonly authentication: Authentication;
  constructor(addAccount: AddAccount, validation: Validation, authentication: Authentication) {
    this.addAccount = addAccount;
    this.validation = validation;
    this.authentication = authentication;
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
      const accessToken = await this.authentication.auth({
        email,
        password,
      });
      return ok(accessToken);
    } catch (error) {
      return serverError(error);
    }
  }
}
