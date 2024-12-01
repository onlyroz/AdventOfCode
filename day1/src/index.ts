import { partOneShout } from "./partOne";
import { partTwoShout } from "./partTwo";
import { readFile, readTestFile } from "./utils";

async function main() {
  partOneShout(await readTestFile());
//  partOneShout(await readFile());

//  partTwoShout(await readTestFile());
//  partTwoShout(await readFile());
}

main();
