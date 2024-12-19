import { shout } from "../utils";

export const partOneShout = async (input = [] as string[]) => {
  shout("Hello from Part One");
  const startTime = performance.now();

  const towels = input[0].split(', ');
  const patterns = input.slice(2);
  const memo = new Map<string, boolean>();

  const process = (pattern: string, towels: string[]) => {
    if (pattern.length === 0)
      return { cont: false, isPossible: true };

    if (memo.has(pattern))
      return { cont: false, isPossible: memo.get(pattern)! };

    const matchedTowels = towels.filter(towel => pattern.startsWith(towel));
    if (matchedTowels.length === 0) {
      memo.set(pattern, false);
      return { cont: false, isPossible: false };
    }

    let anyPossible = false;
    matchedTowels.forEach(matchedTowel => {
      const newPattern = pattern.slice(matchedTowel.length);
      const { isPossible } = process(newPattern, towels);
      if (isPossible) anyPossible = true;
    });

    memo.set(pattern, anyPossible);
    return { cont: !anyPossible, isPossible: anyPossible };
  };

  const numPossible = patterns.reduce((count, pattern) => {
    const { isPossible } = process(pattern, towels);
    return isPossible ? count + 1 : count;
  }, 0);

  shout(`numPossible: ${numPossible}`);

  const endTime = performance.now();
  shout(`Time taken: ${((endTime - startTime)/1000).toFixed(3)} s`); 
};
