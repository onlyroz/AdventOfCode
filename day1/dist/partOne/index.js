"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partOneShout = exports.sum = void 0;
const utils_1 = require("../utils");
const sum = (...a) => a.reduce((acc, val) => acc + val, 0);
exports.sum = sum;
const partOneShout = async (input = []) => {
    (0, utils_1.shout)("Hello from Part One");
    let sum = 0;
    input.forEach((i) => {
        const allNums = i.match(/\d/g) ?? [];
        if (allNums && allNums.length > 0) {
            sum += parseInt(`${allNums[0]}${allNums[allNums.length - 1]}`);
        }
    });
    (0, utils_1.shout)(`The answer is ${sum}`);
};
exports.partOneShout = partOneShout;
;
//# sourceMappingURL=index.js.map