import { AddAccount } from '@domain/use-cases';
import { serveError, ok, badRequest } from '@presentation/helper/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { Validation } from '@presentation/protocols/validation';

export class SignUpControler implements Controller {
  private readonly addAccount: AddAccount;
  private readonly validation: Validation;
  constructor(addAccount: AddAccount, validation: Validation) {
    this.addAccount = addAccount;
    this.validation = validation;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validateError = this.validation.validate(httpRequest.body);
      if (validateError) {
        return badRequest(validateError);
      }
      const httpResponse = await this.addAccount.add(httpRequest.body);
      return ok(httpResponse);
    } catch (error) {
      return serveError(error);
    }
  }
}
