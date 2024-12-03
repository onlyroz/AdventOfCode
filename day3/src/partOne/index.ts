import { shout } from "../utils";

export const partOneShout = async (input = [] as string[]) => {
  shout("Hello from Part One");

  const regex = /mul\(([\d, ]+)\)/g;

  let sum = 0n;
  for (let line of input) {
    const matches = line.match(regex);
    matches?.forEach((match) => {
      const [a, b] = match.replace('mul(', '').replace(')', '').split(',');
      sum += (BigInt(a) * BigInt(b));
    });
  }

  shout(`sum: ${sum.toString()}`); 
};
