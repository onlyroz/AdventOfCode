import { combo, process } from "./index";

test("combo", () => {
  expect(combo(0, 2, 3, 4)).toBe(0);
  expect(combo(1, 2, 3, 4)).toBe(1);
  expect(combo(2, 2, 3, 4)).toBe(2);
  expect(combo(3, 2, 3, 4)).toBe(3);
  expect(combo(4, 2, 3, 4)).toBe(2);
  expect(combo(5, 2, 3, 4)).toBe(3);
  expect(combo(6, 2, 3, 4)).toBe(4);
  expect(combo(7, 2, 3, 4)).toBe(7);
  expect(combo(8, 2, 3, 4)).toBe(8);
});

test("process, increments pointer", () => {
  const { newPointer, output, aVal, bVal, cVal } = 
    process(0, 8, 1, 1, 2, 3);
  
  expect(newPointer).toBe(2);
  expect(output).toBe("");
  expect(aVal).toBe(undefined);
  expect(bVal).toBe(undefined);
  expect(cVal).toBe(undefined);
});

test("process, case 0", () => {
  const { newPointer, output, aVal: aVal1, bVal, cVal } = 
    process(0, 0, 0, 1, 0, 0);
  
  expect(newPointer).toBe(2);
  expect(output).toBe("");
  expect(aVal1).toBe(1); // 1 / 2^0 = 1
  expect(bVal).toBe(undefined);
  expect(cVal).toBe(undefined);

  const { aVal: aVal2 } = process(0, 0, 1, 1, 0, 0);
  expect(aVal2).toBe(0); // 1 / 2^1 = 0.5, floor(0.5) = 0

  const { aVal: aVal3 } = process(0, 0, 2, 1, 0, 0);
  expect(aVal3).toBe(0); // 1 / 2^2 = 0.25, floor(0.25) = 0

  const { aVal: aVal4 } = process(0, 0, 1, 2, 0, 0);
  expect(aVal4).toBe(1); // 2 / 2^1 = 1

  const { aVal: aVal5 } = process(0, 0, 2, 2, 0, 0);
  expect(aVal5).toBe(0); // 2 / 2^2 = 0.5, floor(0.5) = 0

  const { aVal: aVal6 } = process(0, 0, 4, 2, 0, 0);
  expect(aVal6).toBe(0); // 2 / 2^4 = 0.0625, floor(0.0625) = 0

  const { aVal: aVal7 } = process(0, 0, 5, 2, 1, 0);
  expect(aVal7).toBe(1); // 2 / 2^1 = 1

  const { aVal: aVal8 } = process(0, 0, 5, 4, 2, 0);
  expect(aVal8).toBe(1); // 4 / 2^2 = 1
});


