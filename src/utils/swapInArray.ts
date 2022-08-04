export const swapInArray = <T>(arr: T[], i1: number, i2: number): T[] => {
  const t: T = arr[i1];
  arr[i1] = arr[i2];
  arr[i2] = t;
  return arr;
};
