import { ServeError } from '@presentation/errors/server-error';
import { HttpResponse } from '@presentation/protocols';

export const serveError = (error: Error): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServeError(error.stack),
  };
};

export const ok = (data: any): HttpResponse => {
  return {
    statusCode: 200,
    body: data,
  };
};
