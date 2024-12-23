import { shout } from "../utils";

export const partTwoShout = async (input = [] as string[]) => {
  shout("Hello from Part Two!");

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

  // Generate the secrets for each monkey, finding the difference between the
  // last digit of the current number and the last digit of the previous number
  const secrets = input.map((numStr) => {
    let result = BigInt(numStr);
    const ends = [];
    let prev = 0;
    for (let i = 0; i < 2000; i++) {
      result = calculate(result);
      const lastDigit = Number(result.toString().slice(-1));
      ends.push({ val: lastDigit, diff: i > 0 ? lastDigit - prev : 0 });
      prev = lastDigit;
    }
    return ends; 
  });

  const priceMap = new Map<string, number>();

  // Iterate over each monkey's secret list, updating the priceMap
  secrets.forEach((secret) => {
    const keys: string[] = [];
    let iter = 0;

    while (iter <= secret.length - 4) {
      let key = '';
      let val = secret[iter+3].val;

      // Generate a key made up of the next 4 differences
      for (let i = 0; i < 4; i++) {
        key += secret[iter + i].diff + '|';
      }
      
      // Update priceMap with this key if it has not yet appeared for this monkey
      if (!keys.includes(key)) {
        keys.push(key);
        priceMap.set(key, (priceMap.get(key) || 0) + val);
      }

      iter++;
    }
  });

  // Sort the priceMap and find the one with the highest value
  const sortedPriceMap = Array.from(priceMap.entries()).sort((a, b) => b[1] - a[1]);
  const first = sortedPriceMap[0];

  shout(`${first[0]}, ${first[1]}`);
};
