export function validateCard(cardNumber: string) {
  if (!/^\d+$/.test(cardNumber) || cardNumber.length < 2) {
    return false;
  }

  const digits = cardNumber.split('').map(Number);
  const checkDigit = digits.pop()!;
  const reversedDigits = digits.reverse();

  const sum = reversedDigits.reduce((accumulator, currentDigit, index) => {
    if (index % 2 === 0) {
      let doubledDigit = currentDigit * 2;

      if (doubledDigit > 9) {
        doubledDigit -= 9;
      }
      return accumulator + doubledDigit;
    }

    return accumulator + currentDigit;
  }, 0);

  return (sum + checkDigit) % 10 === 0;
}

// * Visa 4242424242424242
// * Mastercard 5454545454545454
