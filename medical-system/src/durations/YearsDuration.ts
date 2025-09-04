import { Duration } from "../interfaces/Duration";

class YearsDuration implements Duration {
  private readonly unitName: string = "Years";
  private readonly millis: number = 365 * 24 * 60 * 60 * 1000;

  unit(): string {
    return this.unitName;
  }

  milliseconds(): number {
    return this.millis;
  }

  singular(): string {
    return "Year";
  }

  plural(): string {
    return "Years";
  }
}

export { YearsDuration };
