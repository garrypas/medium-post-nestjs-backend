module.exports = {
  CognitoJwtVerifier: {
    create: () => ({
      verify: (token) => {
        if (token === 'valid-token') {
          return { username: 'Garry' };
        }
        if (token === 'valid-token-bob') {
          return { username: 'Bob' };
        }
        throw new Error('Invalid token');
      },
    }),
  },
};
