import { shout } from "../utils";

export const partTwoShout = async (input: string[]) => {
  shout("Hello from Part Two!");
  const startTime = performance.now();

  // Convert input string to array of blocks
  const blocks = input[0].split("");
  const fileBlocks = new Array(blocks.reduce((sum, n) => sum + Number(n), 0));

  // Create initial array of numbers and dots more efficiently
  let position = 0;
  blocks.forEach((block, idx) => {
    const count = Number(block);
    const value = idx % 2 === 0 ? idx/2 : ".";
    for (let i = 0; i < count; i++) {
      fileBlocks[position++] = value;
    }
  });

  // Iterate through array from end, looking for sequences to move
  for (let i = fileBlocks.length-1; i >= 0;) {
    if (fileBlocks[i] === '.') {
      i--;
      continue;
    }

    // Count how many identical numbers in sequence
    let seqSize = 1;
    while (i - seqSize >= 0 && fileBlocks[i] === fileBlocks[i - seqSize]) {
      seqSize++;
    }

    // Find first sequence of dots long enough to fit numbers
    let firstSpace = 0;
    let count = 0;
    while (count !== seqSize && firstSpace < i) {
      if (fileBlocks[firstSpace] === '.') count++;
      else count = 0;
      firstSpace++;
    }
    
    // Move the sequence if we found a valid spot
    if (count === seqSize) {
      firstSpace -= seqSize;
      for (let x = 0; x < seqSize; x++) {
        fileBlocks[firstSpace + x] = fileBlocks[i - x];
        fileBlocks[i - x] = '.';
      }
    }

    i -= seqSize;
  }

  // Calculate final sum
  const sum = fileBlocks.reduce((acc, block, idx) => {
    return typeof block === 'number' ? acc + (idx * block) : acc;
  }, 0);

  const endTime = performance.now();
  shout(`Result: ${sum}`);
  shout(`Time taken: ${((endTime - startTime)/1000).toFixed(3)} s`);

  return sum;
};
