import { Stack } from "../interfaces/Stack";
import { EmptyStack } from "./EmptyStack";

class StackFactory {
  static create<T>(): Stack<T> {
    return new EmptyStack();
  }
}

export { StackFactory };
