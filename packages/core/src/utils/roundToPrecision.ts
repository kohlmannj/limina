export const roundToPrecision = (value: number, precision: number | undefined = 5) => {
  if (precision) {
    const roundingBase = 10 ** precision;
    return Math.round((value + 10 ** -(precision + 3)) * roundingBase) / roundingBase;
  }
  return value;
};
