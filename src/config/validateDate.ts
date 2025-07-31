export const validateDate = {
  validate: (date: number) => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;

    const actualDate = +`${month}${year}`;

    if (date < actualDate) return false;
  },
};
