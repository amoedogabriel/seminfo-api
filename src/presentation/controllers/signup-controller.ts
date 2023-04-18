import { AddAccount } from '../../domain/use-cases/add-account';
import { serveError, ok } from '../helper/http/http-helper';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

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
