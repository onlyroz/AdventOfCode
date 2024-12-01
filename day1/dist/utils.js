"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.max = exports.min = exports.zip = exports.range = exports.reverse = exports.shout = exports.readTestFile = exports.readFile = void 0;
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const boxen = require("boxen");
const readFile = async (fileName = "./files/input.txt") => {
    const lines = [];
    const instream = fs.createReadStream(path.resolve(process.cwd(), fileName));
    const rl = readline.createInterface({ input: instream });
    for await (const line of rl) {
        lines.push(line);
    }
    return lines;
};
exports.readFile = readFile;
const readTestFile = async () => await (0, exports.readFile)("./files/test.txt");
exports.readTestFile = readTestFile;
function shout(message) {
    if (typeof message === "number") {
        message = message.toString();
    }
    console.log(boxen(chalk.blue(message), { padding: 1, margin: 1 }));
}
exports.shout = shout;
function reverse(arr) {
    const start = arr.length - 1;
    const reversedArr = [];
    for (let idx = start; idx >= 0; idx--) {
        reversedArr.push(arr[idx]);
    }
    return reversedArr;
}
exports.reverse = reverse;
function range(start, end) {
    const range = [];
    let _start = start, _end = end, reversed = false;
    if (_start > _end) {
        reversed = true;
        _start = end;
        _end = start;
    }
    for (let i = _start; i <= _end; i++) {
        range.push(i);
    }
    return reversed ? reverse(range) : range;
}
exports.range = range;
function zip(arr1, arr2) {
    if (arr1.length !== arr2.length)
        throw new Error(`zip arrays must be of equal length: ${arr1.length}, ${arr2.length}`);
    return arr1.map((t, idx) => [t, arr2[idx]]);
}
exports.zip = zip;
function min(arr) {
    return arr.reduce((acc, cur) => (cur < acc ? cur : acc));
}
exports.min = min;
function max(arr) {
    return arr.reduce((acc, cur) => (cur > acc ? cur : acc));
}
exports.max = max;
//# sourceMappingURL=utils.js.map