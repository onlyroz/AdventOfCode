import { shout } from "../utils";

export const partTwoShout = async (input = [] as string[]) => {
  const instructions = input.filter(line => line.includes('->')).map(line => {
    const tokens = line.split(' ');
    return { a: tokens[0], b: tokens[2], c: tokens[4], operation: tokens[1] };
   });

  const BIT_LENGTH = 45;
  const incorrect: string[] = [];

  for (let i = 0; i < BIT_LENGTH; i++) {
      const id = i.toString().padStart(2, '0');

      const xor1 = instructions.find(instruction => 
        ((instruction.a === `x${id}` && instruction.b === `y${id}`) || 
          (instruction.a === `y${id}` && instruction.b === `x${id}`)) && 
        instruction.operation === 'XOR');

      const and1 = instructions.find(instruction => 
        ((instruction.a === `x${id}` && instruction.b === `y${id}`) || 
          (instruction.a === `y${id}` && instruction.b === `x${id}`)) && 
          instruction.operation === 'AND');

      const z = instructions.find(instruction => instruction.c === `z${id}`);

      if (xor1 === undefined || and1 === undefined || z === undefined) continue;

      // each z must be connected to an XOR
      if (z.operation !== 'XOR') incorrect.push(z.c);
      
      // each AND must go to an OR (besides the first case as it starts the carry flag)
      const or = instructions.find(instruction => 
        instruction.a === and1.c || instruction.b === and1.c);

      if (or !== undefined && or.operation !== 'OR' && i > 0) incorrect.push(and1.c);

      // the first XOR must to go to XOR or AND
      const after = instructions.find(instruction => 
        instruction.a === xor1.c || instruction.b === xor1.c);

      if (after !== undefined && after.operation === 'OR') incorrect.push(xor1.c);
  }

  // each XOR must be connected to an x, y, or z
  incorrect.push(...instructions.filter(instruction => 
    !instruction.a[0].match(/[xy]/g) && 
    !instruction.b[0].match(/[xy]/g) && 
    !instruction.c[0].match(/[z]/g) && 
    instruction.operation === 'XOR'
  ).map(instruction => instruction.c))

  shout(incorrect.sort().join(',')); 
};
