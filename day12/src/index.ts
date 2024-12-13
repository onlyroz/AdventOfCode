import { partOneShout } from "./partOne";
import { partTwoShout } from "./partTwo";
import { partTwoShout2 } from "./partTwo/index2";
import { readFile, readTestFile } from "./utils";

async function main() {
  partOneShout(await readTestFile());
  partOneShout(await readFile());

  partTwoShout(await readTestFile());
  partTwoShout2(await readTestFile());
  partTwoShout(await readFile());
  partTwoShout2(await readFile());
}

main();
