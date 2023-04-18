import { AddAccount } from '../../domain/use-cases/add-account';
import { serveError } from '../helper/http/http-helper';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class SignUpControler implements Controller {
  private readonly addAccount: AddAccount;
  constructor(addAccount: AddAccount) {
    this.addAccount = addAccount;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.addAccount.add(httpRequest.body);
    } catch (error) {
      return serveError(error);
    }
    return null;
  }
}
