import { Duration } from "../interfaces/Duration";

class HoursDuration implements Duration {
  private readonly unitName: string = "Hours";
  private readonly millis: number = 60 * 60 * 1000;

  unit(): string {
    return this.unitName;
  }

  milliseconds(): number {
    return this.millis;
  }

  singular(): string {
    return "Hour";
  }

  plural(): string {
    return "Hours";
  }
}

export { HoursDuration };
