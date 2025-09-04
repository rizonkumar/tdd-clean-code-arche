interface Stack<T> {
  push(element: T): Stack<T>;
  pop(): [T, Stack<T>];
  size(): number;
}

export { Stack };
