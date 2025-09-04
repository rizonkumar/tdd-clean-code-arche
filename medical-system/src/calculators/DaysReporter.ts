import { Duration } from "../interfaces/Duration";
import { AgeReporter } from "../interfaces/AgeReporter";

class DaysReporter implements AgeReporter {
  private readonly daysDuration: Duration;

  constructor(daysDuration: Duration) {
    this.daysDuration = daysDuration;
  }

  selectDuration(ageInMillis: number): Duration | null {
    const oneDay = 24 * 60 * 60 * 1000;
    const oneMonth = 30 * 24 * 60 * 60 * 1000;

    if (ageInMillis >= oneDay && ageInMillis < oneMonth) {
      return this.daysDuration;
    }

    return null;
  }
}

export { DaysReporter };
