import { ServeError } from '../../errors/server-error';
import { HttpResponse } from '../../protocols/http';

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
