import { greet, add } from "../src/index";

describe("greet function", () => {
  it("should return a greeting message", () => {
    const result = greet("Alice");
    expect(result).toBe("Hello, Alice! Welcome to TypeScript Bootcamp!");
  });

  it("should handle empty string", () => {
    const result = greet("");
    expect(result).toBe("Hello, ! Welcome to TypeScript Bootcamp!");
  });
});

describe("add function", () => {
  it("should add two positive numbers", () => {
    const result = add(2, 3);
    expect(result).toBe(5);
  });

  it("should add positive and negative numbers", () => {
    const result = add(5, -3);
    expect(result).toBe(2);
  });

  it("should add two negative numbers", () => {
    const result = add(-2, -3);
    expect(result).toBe(-5);
  });

  it("should handle zero", () => {
    const result = add(0, 5);
    expect(result).toBe(5);
  });
});
