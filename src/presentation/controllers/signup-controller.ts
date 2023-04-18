import { AddAccount } from '@domain/use-cases';
import { serveError, ok } from '@presentation/helper/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';

export class SignUpControler implements Controller {
  private readonly addAccount: AddAccount;
  constructor(addAccount: AddAccount) {
    this.addAccount = addAccount;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const httpResponse = await this.addAccount.add(httpRequest.body);
      return ok(httpResponse);
    } catch (error) {
      return serveError(error);
    }
  }
}
