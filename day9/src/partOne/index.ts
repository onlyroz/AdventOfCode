import { shout } from "../utils";

export const partOneShout = async (input = [] as string[]) => {
  shout("Hello from Part One");

  const startTime = performance.now();

  const blocks = input[0].split("");

  const fileBlocks = blocks.reduce((acc, block, idx) => {
    const isOdd = idx % 2 === 0;
    for (let i = 0; i < Number(block); i++) {
      acc.push(isOdd ? idx/2 : ".");
    }
    return acc;
  }, [] as (string | number)[]);

  for (let i = fileBlocks.length - 1; i >= 0; i--) {
    if (fileBlocks[i] !== ".") {
      const dot = fileBlocks.findIndex((block) => block === ".");
      if (dot >= 0) {
        const block = fileBlocks.splice(i, 1)[0];
        fileBlocks.splice(dot, 1, block);
      } else break;
    } else fileBlocks.splice(i, 1);
  }

  const sum = fileBlocks.map(Number).reduce((acc, block, idx) => {
    return acc + idx * block;
  }, 0);

  const endTime = performance.now();

  shout(`Result: ${sum}`);
  shout(`Time taken: ${((endTime - startTime)/1000).toFixed(3)} s`);
};
