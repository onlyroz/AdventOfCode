import { shout } from "../utils";

export const partTwoShout = async (input = [] as string[]) => {
  shout("Hello from Part Two!");
  const startTime = performance.now();

  const process = (target: number, num: number, rest: number[]): boolean => {
    if (num > target) return false;
    if (rest.length === 0) return target === num;

    const [nextNum, ...nextRest] = rest;
    return process(target, num + nextNum, nextRest) || 
      process(target, num * nextNum, nextRest) ||
      process(target, Number(`${num}${nextNum}`), nextRest);
  }

  const sum = input.reduce((acc, line) => {
    const [target, num, ...rest] = line.split(/:? /).map(Number);
    const isValid = process(target, num, rest);
    return acc + (isValid ? Number(target) : 0);
  }, 0);

  const endTime = performance.now();

  shout(`sum: ${sum}`);
  shout(`Time taken: ${((endTime - startTime)/1000).toFixed(2)} s`);
};
