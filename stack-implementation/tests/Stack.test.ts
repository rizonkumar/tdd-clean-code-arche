import { StackFactory } from "../src/implementations/StackFactory";

describe("Stack", () => {
  it("creates empty stack", () => {
    const stack = StackFactory.create<number>();
    expect(stack.size()).toBe(0);
  });

  it("pushes elements to stack", () => {
    const stack = StackFactory.create<number>();
    const newStack = stack.push(1);
    expect(newStack.size()).toBe(1);
  });

  it("pops elements from stack", () => {
    const stack = StackFactory.create<number>();
    const stackWithOne = stack.push(1);
    const [element, newStack] = stackWithOne.pop();
    expect(element).toBe(1);
    expect(newStack.size()).toBe(0);
  });

  it("handles multiple push operations", () => {
    const stack = StackFactory.create<string>();
    const stack1 = stack.push("first");
    const stack2 = stack1.push("second");
    const stack3 = stack2.push("third");
    expect(stack3.size()).toBe(3);
  });

  it("handles multiple pop operations", () => {
    const stack = StackFactory.create<string>();
    const stack1 = stack.push("first");
    const stack2 = stack1.push("second");

    const [second, stackAfterFirstPop] = stack2.pop();
    const [first, emptyStack] = stackAfterFirstPop.pop();

    expect(second).toBe("second");
    expect(first).toBe("first");
    expect(emptyStack.size()).toBe(0);
  });

  it("throws error when popping empty stack", () => {
    const stack = StackFactory.create<number>();
    expect(() => stack.pop()).toThrow("Cannot pop from empty stack");
  });
});
