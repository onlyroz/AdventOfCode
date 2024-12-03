import { shout } from "../utils";

export const partTwoShout = async (input = [] as string[]) => {
  shout("Hello from Part Two!");

  const regex = /(?:mul\((\d+),(\d+)\)|do\(\)|don't\(\))/g;

  let sum = 0n;
  let include = true;
  for (let line of input) {
    const matches = line.match(regex);
    matches?.forEach((match) => {
      if (match === "do()") {
        include = true;
      } else if (match === "don't()") {
        include = false;
      } else if (include && match.startsWith('mul')) {
        const [a, b] = match.replace('mul(', '').replace(')', '').split(',');
        sum += (BigInt(a) * BigInt(b));
      }
    });
  } 

  shout(`sum: ${sum.toString()}`); 
};
