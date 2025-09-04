import { Duration } from "../interfaces/Duration";
import { AgeReporter } from "../interfaces/AgeReporter";

class MonthsReporter implements AgeReporter {
  private readonly monthsDuration: Duration;

  constructor(monthsDuration: Duration) {
    this.monthsDuration = monthsDuration;
  }

  selectDuration(ageInMillis: number): Duration | null {
    const oneMonth = 30 * 24 * 60 * 60 * 1000;
    const oneYear = 365 * 24 * 60 * 60 * 1000;

    if (ageInMillis >= oneMonth && ageInMillis < oneYear) {
      return this.monthsDuration;
    }

    return null;
  }
}

export { MonthsReporter };
