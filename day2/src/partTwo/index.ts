import { shout } from "../utils";

const isValidSequence = (nums: number[]): boolean => {
  if (nums.length === 0) return false;
  
  let prevVal = nums[0];
  let prevIncreasing: boolean | undefined;

  for (let i = 1; i < nums.length; i++) {
    const diff = nums[i] - prevVal;
    const increasing = diff > 0;
    const absDiff = Math.abs(diff);

    if (absDiff > 3 || absDiff === 0) return false;
    if (i > 1 && prevIncreasing !== increasing) return false;

    prevVal = nums[i];
    prevIncreasing = increasing;
  }

  return true;
};

export const partTwoShout = async (input = [] as string[]) => {
  shout("Hello from Part Two!");

  const sum = input.reduce((acc, line) => {
    const nums = line.split(' ').map(Number);

    let isValid = isValidSequence(nums);
    if (!isValid) {
      for (let i = 0; i < nums.length; i++) {
        const removed = [...nums.slice(0, i), ...nums.slice(i + 1)];
        if (isValidSequence(removed)) {
          isValid = true;
          break;
        }
      }
    }
    return acc + (isValid ? 1 : 0);
  }, 0);

  shout(`Sum is ${sum}`); 
};
