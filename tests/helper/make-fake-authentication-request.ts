export const makeFakeAuthenticationRequest = () => {
  return {
    body: {
      email: 'any_email@mail.com',
      password: 'any_password',
    },
  };
};
