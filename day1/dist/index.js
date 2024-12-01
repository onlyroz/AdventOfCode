"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const partOne_1 = require("./partOne");
const partTwo_1 = require("./partTwo");
const utils_1 = require("./utils");
async function main() {
    (0, partOne_1.partOneShout)(await (0, utils_1.readFile)());
    (0, partTwo_1.partTwoShout)(await (0, utils_1.readFile)());
}
main();
//# sourceMappingURL=index.js.map