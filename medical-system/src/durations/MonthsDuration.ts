import { Duration } from "../interfaces/Duration";

class MonthsDuration implements Duration {
  private readonly unitName: string = "Months";
  private readonly millis: number = 30 * 24 * 60 * 60 * 1000;

  unit(): string {
    return this.unitName;
  }

  milliseconds(): number {
    return this.millis;
  }

  singular(): string {
    return "Month";
  }

  plural(): string {
    return "Months";
  }
}

export { MonthsDuration };
