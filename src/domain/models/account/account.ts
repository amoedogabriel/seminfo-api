export type AccountModel = {
  id: string;
  name: string;
  email: string;
  password: string;
  confirmationToken?: string;
  expirationToken?: number;
};
