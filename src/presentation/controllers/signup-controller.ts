import { AddAccount } from '../../domain/use-cases/add-account';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class SignUpControler implements Controller {
  private readonly addAccount: AddAccount;
  constructor(addAccount: AddAccount) {
    this.addAccount = addAccount;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.addAccount.add(httpRequest.body);
    return null;
  }
}
