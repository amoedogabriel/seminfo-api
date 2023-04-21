import { ServerError } from '@presentation/errors';
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
