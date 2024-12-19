import { shout } from "../utils";

export const partOneShout = async (input = [] as string[]) => {
  shout("Hello from Part One");
  const startTime = performance.now();

  const towels = input[0].split(', ');
  const patterns = input.slice(2);
  const memo = new Map<string, boolean>();

  const process = (pattern: string, towels: string[]): boolean => {
    if (pattern.length === 0) return true;

    if (memo.has(pattern)) return memo.get(pattern)!;

    const matchedTowels = towels.filter(towel => pattern.startsWith(towel));
    if (matchedTowels.length === 0) {
      memo.set(pattern, false);
      return false;
    }

    const anyPossible = matchedTowels.reduce((acc, matchedTowel) => {
      const newPattern = pattern.slice(matchedTowel.length);
      return acc || process(newPattern, towels);
    }, false);

    memo.set(pattern, anyPossible);
    return anyPossible;
  };

  const numPossible = patterns.reduce((count, pattern) => {
    return process(pattern, towels) ? count + 1 : count;
  }, 0);

  shout(`numPossible: ${numPossible}`);

  const endTime = performance.now();
  shout(`Time taken: ${((endTime - startTime)/1000).toFixed(3)} s`); 
};
