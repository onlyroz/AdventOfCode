import { shout } from "../utils";

export const partOneShout = async (input = [] as string[]) => {
  shout("Hello from Part One");

  const list1: number[] = [];
  const list2: number[] = [];

  input.forEach(line => {
    const [a, b] = line.split("   ");
    list1.push(Number(a));
    list2.push(Number(b));
  });

  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);

  const sum = list1.reduce((acc, val, i) => 
    acc + Math.abs(list2[i] - val), 0
  );

  shout(`The answer is ${sum}`);
};
