import { useState, useEffect } from 'react';

/**
 * Generate a seed-based random index from an array length
 * Uses timestamp to ensure different values on each page load
 * Generates seed client-side only to avoid SSR caching
 */
export default function useSeededRandom(dependencies: any[] = []) {
  const [seed, setSeed] = useState<number>(0);
  
  useEffect(() => {
    // Generate seed only on client-side after mount
    setSeed(Date.now());
  }, dependencies);
  
  const getIndex = (arrayLength: number) => {
    if (seed === 0) return 0;
    return Math.floor(seed / 100) % arrayLength;
  };
  
  return { seed, getIndex };
}
