import { shout } from "../utils";

export const partTwoShout = async (input = [] as string[]) => {
  shout("Hello from Part Two!");

  let a1 = 0;
  let a2 = 0;
  let b1 = 0;
  let b2 = 0;
  let c1 = 0;
  let c2 = 0;
  let count = 0;
  input.push('');

  input.forEach(line => {
    if (line === '') {
      const na = ((c1 * b2) - (c2 * b1)) / ((a1 * b2) - (b1 * a2));
      const nb = ((c2 * a1) - (c1 * a2)) / ((a1 * b2) - (b1 * a2));

      if (Number.isInteger(na) && Number.isInteger(nb)) {
        count += (3 * na) + nb;
      }
    }; 

    const modifiedLine = line.replaceAll(' ', '').replace('X+', '').replace('Y+', '').replace('X=', '').replace('Y=', '');

    if (modifiedLine.includes('ButtonA')) {
      const [x, y] = modifiedLine.replace('ButtonA:', '').split(',').map(x => parseInt(x));
      a1 = x;
      a2 = y;
    }

    if (modifiedLine.includes('ButtonB')) {
      const [x, y] = modifiedLine.replace('ButtonB:', '').split(',').map(x => parseInt(x));
      b1 = x;
      b2 = y;
    }

    if (modifiedLine.includes('Prize')) {
      const [x, y] = modifiedLine.replace('Prize:', '').split(',').map(x => parseInt(x));
      c1 = x + 10000000000000;
      c2 = y + 10000000000000;
    }
  });

  shout(`Part One: ${count}`);
};
