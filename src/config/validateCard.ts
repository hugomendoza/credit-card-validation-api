export const validateCard = {
  validate: (number: string) => {
    const arr = (number + '')
      .split('')
      .reverse()
      .map((x) => parseInt(x));
    const lastDigit = arr.shift();
    let sum = arr.reduce(
      (acc, val, i) =>
        i % 2 !== 0 ? acc + val : acc + ((val *= 2) > 9 ? val - 9 : val),
      0
    );
    sum += lastDigit || 0;
    return sum % 10 === 0;
  },
};
