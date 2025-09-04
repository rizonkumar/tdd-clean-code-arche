import { Stack } from "../interfaces/Stack";

// EmptyStack represents a stack with no elements
class EmptyStack<T> implements Stack<T> {
  private readonly elements: readonly T[] = [];

  push(element: T): Stack<T> {
    const { NonEmptyStack } = require("./NonEmptyStack");
    return new NonEmptyStack([element]);
  }

  pop(): [T, Stack<T>] {
    throw new Error("Cannot pop from empty stack");
  }

  size(): number {
    return 0;
  }
}

export { EmptyStack };
