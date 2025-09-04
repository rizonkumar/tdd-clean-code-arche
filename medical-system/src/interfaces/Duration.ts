interface Duration {
  unit(): string;

  milliseconds(): number;

  singular(): string;

  plural(): string;
}

export { Duration };
