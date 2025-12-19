export const getSeededIndex = (seed: number, arrayLength: number): number => {
  return Math.floor(seed / 100) % arrayLength;
};