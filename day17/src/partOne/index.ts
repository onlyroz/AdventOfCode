import { shout } from "../utils";

export const combo = (operand: number, regA: number, regB: number, regC: number) => {
  if (operand === 4) return regA;
  if (operand === 5) return regB;
  if (operand === 6) return regC;
  return operand;
}

export const process = (pointer: number, opcode: number, operand: number, 
    regA: number, regB: number, regC: number) => {
  let newPointer = pointer + 2;
  let output = "";
  let aVal = undefined;
  let bVal = undefined;
  let cVal = undefined;

  switch (opcode) {
    case 0: // Division, A / 2^combo, truncate to integer, write to A
      aVal = Math.floor(regA / Math.pow(2, combo(operand, regA, regB, regC)));
      break;
    case 1: // Bitwise XOR, B ^ operand, write to B
      bVal = regB ^ operand;
      break;
    case 2: // combo modulo 8, write to B
      bVal = combo(operand, regA, regB, regC) % 8;
      break;
    case 3: // Nothing or jump to operand
      if (regA > 0) newPointer = operand;
      break;
    case 4: // Bitwise XOR, B ^ C
      bVal = regB ^ regC;
      break;
    case 5: // Combo modulo 8 then output
      output = (combo(operand, regA, regB, regC) % 8).toString();
      break;
    case 6: // Division, A / 2^combo, truncate to integer, write to B
      bVal = Math.floor(regA / Math.pow(2, combo(operand, regA, regB, regC)));  
      break;
    case 7: // Division, A / 2^combo, truncate to integer, write to C
      cVal = Math.floor(regA / Math.pow(2, combo(operand, regA, regB, regC)));
      break;
  }
  return { newPointer, output, aVal, bVal, cVal };
}

export const partOneShout = async (input = [] as string[]) => {
  shout("Hello from Part One");

  let registerA = Number(input[0].replace("Register A: ", ""));
  let registerB = Number(input[1].replace("Register B: ", ""));
  let registerC = Number(input[2].replace("Register C: ", ""));
  const program = input[4].replace("Program: ", "").split(",").map(Number);

  let answers: string[] = [];
  let pointer = 0;
  while (pointer < program.length) {
    const { newPointer, output, aVal, bVal, cVal } = 
      process(pointer, program[pointer], program[pointer + 1], registerA, registerB, registerC);

    pointer = newPointer;
    if (output) answers.push(output);
    if (typeof aVal !== 'undefined') registerA = aVal;
    if (typeof bVal !== 'undefined') registerB = bVal;
    if (typeof cVal !== 'undefined') registerC = cVal;
  }

  shout(`Answers: ${answers.join(',')}`);
};
