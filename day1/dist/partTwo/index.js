"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partTwoShout = exports.sum = void 0;
const utils_1 = require("../utils");
const sum = (...a) => a.reduce((acc, val) => acc + val, 0);
exports.sum = sum;
const partTwoShout = async (input = []) => {
    (0, utils_1.shout)("Hello from Part Two!");
    const wordToNumber = {
        one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9
    };
    const isDigit = (character) => {
        return /^\d$/.test(character);
    };
    const sum = input.reduce((sum, str) => {
        const numbers = [];
        let currentWord = '';
        [...str].forEach((currentChar, i) => {
            if (isDigit(currentChar)) {
                numbers.push(Number(currentChar));
                currentWord = '';
            }
            else {
                const word = Object.keys(wordToNumber).find(word => str.startsWith(word, i));
                if (word) {
                    numbers.push(wordToNumber[word]);
                    currentWord = currentChar;
                }
            }
        });
        sum += parseInt(`${numbers[0]}${numbers[numbers.length - 1]}`);
        return sum;
    }, 0);
    (0, utils_1.shout)(sum);
};
exports.partTwoShout = partTwoShout;
//# sourceMappingURL=index.js.map