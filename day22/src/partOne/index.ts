import { shout } from "../utils";

export const partOneShout = async (input = [] as string[]) => {
  shout("Hello from Part One");

  const calculate = (num: bigint) => {
    const numtimes64 = num * 64n;
    const xor1 = numtimes64 ^ num;
    const prune1 = xor1 % 16777216n;
    const numdiv32 = prune1 / 32n;
    const xor2 = numdiv32 ^ prune1;
    const prune2 = xor2 % 16777216n;
    const numtimes2048 = prune2 * 2048n;
    const xor3 = numtimes2048 ^ prune2;
    return xor3 % 16777216n;
  };

  const nums = input.map((numStr) => {
    let result = BigInt(numStr);
    for (let i = 0; i < 2000; i++) {
      result = calculate(result);
    }
    return result;
  });

  const result = nums.reduce((acc, num) => {
    return acc + num;
  }, 0n);

  shout(result.toString());
};
 