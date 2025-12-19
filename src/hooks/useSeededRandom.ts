import { useMemo } from 'react';

/**
 * Generate a seed-based random index from an array length
 * Uses timestamp to ensure different values on each page load
 */
export default function useSeededRandom(dependencies: any[] = []) {
  const seed = useMemo(() => Date.now(), dependencies);
  
  const getIndex = (arrayLength: number) => {
    return Math.floor(seed / 100) % arrayLength;
  };
  
  return { seed, getIndex };
}
