import { Duration } from "../interfaces/Duration";

class DecadesDuration implements Duration {
  private readonly unitName: string = "Decades";
  private readonly millis: number = 10 * 365 * 24 * 60 * 60 * 1000;

  unit(): string {
    return this.unitName;
  }

  milliseconds(): number {
    return this.millis;
  }

  singular(): string {
    return "Decade";
  }

  plural(): string {
    return "Decades";
  }
}

export { DecadesDuration };
