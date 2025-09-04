import { Duration } from "../interfaces/Duration";

class WeeksDuration implements Duration {
  private readonly unitName: string = "Weeks";
  private readonly millis: number = 7 * 24 * 60 * 60 * 1000;

  unit(): string {
    return this.unitName;
  }

  milliseconds(): number {
    return this.millis;
  }

  singular(): string {
    return "Week";
  }

  plural(): string {
    return "Weeks";
  }
}

export { WeeksDuration };
