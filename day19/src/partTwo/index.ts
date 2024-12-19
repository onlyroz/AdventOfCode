import { shout } from "../utils";

export const partTwoShout = async (input = [] as string[]) => {
  shout("Hello from Part Two!");
  const startTime = performance.now();

  const towels = input[0].split(', ');
  const patterns = input.slice(2);
  const memo = new Map<string, number>();

  const process = (pattern: string, towels: string[]): number => {
    if (pattern.length === 0) return 1

    if (memo.has(pattern)) return memo.get(pattern)!;

    const matchedTowels = towels.filter(towel => pattern.startsWith(towel));
    if (matchedTowels.length === 0) {
      memo.set(pattern, 0);
      return 0;
    }

    const totalPossibleCount = matchedTowels.reduce((count, matchedTowel) => {
      const newPattern = pattern.slice(matchedTowel.length);
      return count + process(newPattern, towels);
    }, 0);

    memo.set(pattern, totalPossibleCount);
    return totalPossibleCount;
  };

  const numPossible = patterns.reduce((count, pattern) => {
    return process(pattern, towels) + count;
  }, 0);

  shout(`numPossible: ${numPossible}`);

  const endTime = performance.now();
  shout(`Time taken: ${((endTime - startTime)/1000).toFixed(3)} s`); 
};
