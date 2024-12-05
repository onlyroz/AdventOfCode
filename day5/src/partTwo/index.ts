import { shout } from "../utils";

export const partTwoShout = async (input = [] as string[]) => {
  shout("Hello from Part Two!");

  const rules: { left: number; right: number; }[] = [];
  const updates: number[][] = [];
  let rulesRead = false;

  input.forEach(line => {
    if (line === "") {
      rulesRead = true;
      return;
    }
    if (!rulesRead) {
      const [left, right] = line.split('|');
      rules.push({
        left: Number(left),
        right: Number(right),
      });
    }
    if (rulesRead) {
      updates.push(line.split(',').map(Number));
    }
  });

  const isUpdateValid = (update: number[]) => {
    return update.every((num, idx, self) => {
      const tail = self.slice(idx + 1);
      const invalid = tail.some(tailNum => 
        rules.some(rule => num === rule.right && tailNum === rule.left)
      );
      return !invalid;
    });
  };

  const sum = updates.reduce((acc, update) => {
    const isValid = isUpdateValid(update);
    if (isValid) return acc;

    const sortedUpdate = update.sort((a, b) => {
      const hasRule = rules.some(rule => a === rule.right && b === rule.left);
      return hasRule ? -1 : 1;
    });

    return acc + sortedUpdate[Math.round((update.length-1) / 2)];
  }, 0);

  shout(`Sum: ${sum}`);
};
