import { hasEvenDigits, shout, splitNumber } from "../utils";

class StoneCollection {
  stones: Map<string, number> = new Map();
  
  constructor(initial: string[]) {
    initial.forEach(n => {
      const current = this.stones.get(n) || 0;
      this.stones.set(n, current + 1);
    });
  }

  transform(): void {
    const newStones = new Map<string, number>();

    for (const [value, count] of this.stones.entries()) {
      const num = BigInt(value as unknown as string);
    
      if (num === BigInt(0)) {
        newStones.set('1', (newStones.get('1') || 0) + count);
      } else if (hasEvenDigits(num)) {
        const [left, right] = splitNumber(num);
        newStones.set(left, (newStones.get(left) || 0) + count);
        newStones.set(right, (newStones.get(right) || 0) + count);
      } else {
        const result = (BigInt(value) * BigInt(2024)).toString();
        newStones.set(result, (newStones.get(result) || 0) + count);
      }
    }
    
    this.stones = newStones;
  }

   getLength = () =>
    Array.from(this.stones.values()).reduce((sum, count) => sum + count, 0);
}

export const partTwoShout = async (input = [] as string[]) => {
  shout("Hello from Part Two!");
  const startTime = performance.now();
  const collection = new StoneCollection(input[0].split(' '));

  for (let i = 0; i < 75; i++) {
    collection.transform();
  }

  const endTime = performance.now();

  shout(`Time taken: ${((endTime - startTime)/1000).toFixed(3)} s`);
  shout(`Final length: ${collection.getLength()}`);
};
