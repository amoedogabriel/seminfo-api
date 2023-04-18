import { ServeError } from '../../errors/server-error';
import { HttpResponse } from '../../protocols/http';

export const serveError = (error: Error): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServeError(error.stack),
  };
};
