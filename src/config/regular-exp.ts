export const regularExps = {
  // email
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,

  // Prefijos de tarjetas de crédito
  cards: {
    VISA: /^4/,
    MASTERCARD: /^5[1-5]/,
  },
};
