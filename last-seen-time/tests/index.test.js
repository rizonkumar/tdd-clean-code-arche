"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
describe("greet function", () => {
    it("should return a greeting message", () => {
        const result = (0, index_1.greet)("Alice");
        expect(result).toBe("Hello, Alice! Welcome to TypeScript Bootcamp!");
    });
    it("should handle empty string", () => {
        const result = (0, index_1.greet)("");
        expect(result).toBe("Hello, ! Welcome to TypeScript Bootcamp!");
    });
});
describe("add function", () => {
    it("should add two positive numbers", () => {
        const result = (0, index_1.add)(2, 3);
        expect(result).toBe(5);
    });
    it("should add positive and negative numbers", () => {
        const result = (0, index_1.add)(5, -3);
        expect(result).toBe(2);
    });
    it("should add two negative numbers", () => {
        const result = (0, index_1.add)(-2, -3);
        expect(result).toBe(-5);
    });
    it("should handle zero", () => {
        const result = (0, index_1.add)(0, 5);
        expect(result).toBe(5);
    });
});
//# sourceMappingURL=index.test.js.map