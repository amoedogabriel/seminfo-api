export type AccountModel = {
  id: string;
  name: string;
  email: string;
  password: string;
  activated: boolean;
  confirmationToken?: string;
  expirationToken?: number;
};
