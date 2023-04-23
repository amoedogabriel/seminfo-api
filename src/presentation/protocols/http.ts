export type HttpRequest = {
  body?: any;
  email?: string;
  confirmationToken?: string;
};

export type HttpResponse = {
  statusCode: number;
  body?: any;
};
