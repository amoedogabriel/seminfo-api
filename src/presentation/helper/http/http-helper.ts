import { ServerError } from '@presentation/errors';
import { UnauthorizedError } from '@presentation/errors/unauthorized-error';
import { HttpResponse } from '@presentation/protocols';

export const serverError = (error: Error): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError(error.stack),
  };
};

export const ok = (data: any): HttpResponse => {
  return {
    statusCode: 200,
    body: data,
  };
};

export const badRequest = (data: any): HttpResponse => {
  return {
    statusCode: 400,
    body: data,
  };
};

export const forbidden = (data: any): HttpResponse => {
  return {
    statusCode: 403,
    body: data,
  };
};

export const unauthorized = (): HttpResponse => {
  return {
    statusCode: 401,
    body: new UnauthorizedError(),
  };
};

export const noContent = (): HttpResponse => {
  return {
    statusCode: 204,
    body: null,
  };
};
