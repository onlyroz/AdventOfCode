import { shout } from "../utils";

export const sum = (...a: number[]) => a.reduce((acc, val) => acc + val, 0);

export const partTwoShout = async (input = [] as string[]) => {
  shout("Hello from Part Two!");

  const list1: number[] = [];
  const list2: number[] = [];

  input.forEach(line => {
    const [a, b] = line.split("   ");
    list1.push(Number(a));
    list2.push(Number(b));
  });

  const list2Freq = list2.reduce((freq, num) => {
    freq[num] = (freq[num] || 0) + 1;
    return freq;
  }, {} as Record<number, number>);

  const sumOfSimilarities = list1.reduce((acc, num) => 
    acc + (num * (list2Freq[num] || 0)), 0
  ); 

  shout(`The answer is ${sumOfSimilarities}`);
};
