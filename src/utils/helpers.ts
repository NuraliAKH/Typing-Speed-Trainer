export const countsErrors = (actual: string, expected: string) => {
  const expectedCharacters = expected.split("");

  return expectedCharacters.reduce((errors, expectedChar, i) => {
    const actualChar = actual[i];
    if (actualChar !== expectedChar) {
      errors++;
    }
    return errors;
  }, 0);
};

export const calculateAccurancePercentage = (errors: number, total: number) => {
  if (total > 0) {
    const corrects = total - errors;
    return (corrects * 100) / total;
  }
  return 0;
};

export const calculateWRM = (total: number, errors: number, time: number) => {
  console.log(total, errors, time);

  if (total > 0 && time > 0) {
    const corrects = total - errors;
    return Math.floor((corrects / time) * 60);
  }
  return 0;
};
