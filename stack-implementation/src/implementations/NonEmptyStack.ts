import { Stack } from "../interfaces/Stack";

// NonEmptyStack represents a stack with one or more elements
class NonEmptyStack<T> implements Stack<T> {
  private readonly elements: readonly T[];

  constructor(elements: readonly T[]) {
    this.elements = elements;
  }

  push(element: T): Stack<T> {
    return new NonEmptyStack([element, ...this.elements]);
  }

  pop(): [T, Stack<T>] {
    const [top, ...rest] = this.elements;

    return this.createResultStack(top, rest);
  }

  private createResultStack(top: T, rest: readonly T[]): [T, Stack<T>] {
    const { EmptyStack } = require("./EmptyStack");

    if (rest.length === 0) {
      return [top, new EmptyStack()];
    }

    return [top, new NonEmptyStack(rest)];
  }

  size(): number {
    return this.elements.length;
  }
}

export { NonEmptyStack };
