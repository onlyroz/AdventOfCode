"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
test("reverse", () => {
    expect((0, utils_1.reverse)([0, 1, 2])).toStrictEqual([2, 1, 0]);
});
test("range", () => {
    expect((0, utils_1.range)(0, 2)).toStrictEqual([0, 1, 2]);
    expect((0, utils_1.range)(2, 0)).toStrictEqual([2, 1, 0]);
});
test("zip", () => {
    expect((0, utils_1.zip)([0, 0, 0], [1, 1, 1])).toStrictEqual([
        [0, 1],
        [0, 1],
        [0, 1],
    ]);
});
test("min", () => {
    expect((0, utils_1.min)([2, 1, 0])).toBe(0);
    expect((0, utils_1.min)([1, 2, 3])).toBe(1);
});
test("max", () => {
    expect((0, utils_1.max)([2, 1, 0])).toBe(2);
    expect((0, utils_1.max)([1, 2, 3])).toBe(3);
});
//# sourceMappingURL=utils.spec.js.map