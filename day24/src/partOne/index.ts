import { shout } from "../utils";

export const partOneShout = async (input = [] as string[]) => {
  shout("Hello from Part One");

  type Operation = {
    output: string;
    operator: string;
  }

  const wires = new Map<string, number | undefined>();
  const operations = new Map<string, Operation>();

  for (const line of input) {
    if (line.includes(": ")) {
      const [wire, value] = line.split(": ");
      wires.set(wire, Number(value));
    } else if (line !== "") {
      const [input, output] = line.split(" -> ");
      const [left, operator, right] = input.split(" ");
      operations.set(`${left},${right},${output}`, { output, operator });

      if (!wires.has(left)) wires.set(left, undefined);
      if (!wires.has(right)) wires.set(right, undefined);
      if (!wires.has(output)) wires.set(output, undefined);
    }
  }
  
  const hasAllZValues = () => Array.from(wires.entries())
    .filter(([key, _]) => key.startsWith("z"))
    .every(([_, value]) => typeof value !== "undefined");

  while (!hasAllZValues()) {
    for (const [key, operation] of operations.entries()) {
      const [left, right] = key.split(",");
      const leftWire = wires.get(left);
      const rightWire = wires.get(right);

      if (typeof leftWire === "undefined" || typeof rightWire === "undefined") 
        continue;

      if (operation.operator === "AND") {
        wires.set(operation.output, leftWire && rightWire);
      } else if (operation.operator === "OR") {
        wires.set(operation.output, leftWire || rightWire);
      } else if (operation.operator === "XOR") {
        wires.set(operation.output, leftWire ^ rightWire);
      }

      operations.delete(key);
    }
  }

  const zWires = Array.from(wires.entries())
    .filter(([key, _]) => key.startsWith("z"))
    .sort((a, b) => {
      const numA = parseInt(a[0].substring(1));
      const numB = parseInt(b[0].substring(1));
      return numB - numA;
    })
    .map(([_, value]) => value)
    .join("");

  const decimal = parseInt(zWires, 2);
  shout(`Binary: ${zWires}`);
  shout(`Decimal: ${decimal}`);
};
