import { Duration } from "../interfaces/Duration";

class DaysDuration implements Duration {
  private readonly unitName: string = "Days";
  private readonly millis: number = 24 * 60 * 60 * 1000;

  unit(): string {
    return this.unitName;
  }

  milliseconds(): number {
    return this.millis;
  }

  singular(): string {
    return "Day";
  }

  plural(): string {
    return "Days";
  }
}

export { DaysDuration };
