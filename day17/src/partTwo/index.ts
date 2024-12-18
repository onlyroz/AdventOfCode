import { shout } from "../utils";

const mod = (n: number, m: number) => ((n % m) + m) % m;

const combo = (operand: number, regA: number, regB: number, regC: number) => {
  if (operand === 4) return regA;
  if (operand === 5) return regB;
  if (operand === 6) return regC;
  return operand;
}

const process = (
  pointer: number,
  opcode: number,
  operand: number,
  regA: number,
  regB: number,
  regC: number
) => {
  let newPointer = pointer + 2;
  let output = undefined;
  let aVal = undefined;
  let bVal = undefined;
  let cVal = undefined;

  switch (opcode) {
    case 0: // Division, A / 2^combo, truncate to integer, write to A
      aVal = Math.floor(regA / Math.pow(2, combo(operand, regA, regB, regC)));
      break;
    case 1: // Bitwise XOR, B ^ operand, write to B
      bVal = (regB ^ operand) >>> 0;  // Keep the unsigned right shift
      break;
    case 2: // combo modulo 8, write to B
      bVal = combo(operand, regA, regB, regC) % 8;
      break;
    case 3: // Nothing or jump to operand
      if (regA !== 0) newPointer = operand;  // Changed from > 0 to !== 0
      break;
    case 4: // Bitwise XOR, B ^ C
      bVal = (regB ^ regC) >>> 0;  // Keep the unsigned right shift
      break;
    case 5: // Combo modulo 8 then output
      output = combo(operand, regA, regB, regC) % 8;
      break;
    case 6: // Division, A / 2^combo, truncate to integer, write to B
      bVal = Math.floor(regA / Math.pow(2, combo(operand, regA, regB, regC)));  
      break;
    case 7: // Division, A / 2^combo, truncate to integer, write to C
      cVal = Math.floor(regA / Math.pow(2, combo(operand, regA, regB, regC)));
      break;
  }
  return { newPointer, output, aVal, bVal, cVal };
};

const run = (program: number[], counter: number, input: string[], log = false) => {
  let registerA = counter;
  let registerB = Number(input[1].replace("Register B: ", ""));
  let registerC = Number(input[2].replace("Register C: ", ""));

  let answers: number[] = [];
  let pointer = 0;
  while (pointer < program.length) {
    const { newPointer, output, aVal, bVal, cVal } = 
      process(pointer, program[pointer], program[pointer + 1], registerA, registerB, registerC);

    pointer = newPointer;
    if (output !== undefined) answers.push(output);
    if (typeof aVal !== 'undefined') registerA = aVal;
    if (typeof bVal !== 'undefined') registerB = bVal;
    if (typeof cVal !== 'undefined') registerC = cVal;
  }

  if (log) console.log('counter', counter, 'answers', answers.join(','));
  return answers.join(',');
};

export const partTwoShout = async (input = [] as string[]) => {
  const program = input[4].replace("Program: ", "").split(",").map(Number);
  
  interface QueueItem {
    result: number;
    len: number;
  }

  const Q: QueueItem[] = [];
  Q.push({ result: 0, len: 0 });
  let answer = 0;
  
  while (Q.length) {
    const q = Q.shift()!;
    if (q.len === program.length) {
      answer = q.result;
      break;
    }
    
    const base = q.result * 8;
    const expect = program.slice((q.len + 1) * -1).join(',');
    
    for (let a = base; a <= base + 7; a++) {
      const r = run(program, a, input);
      if (r === expect) {
        Q.push({ result: a, len: q.len + 1 });
      }
    } 
  }

  shout(`Answer: ${answer}`);
}; 