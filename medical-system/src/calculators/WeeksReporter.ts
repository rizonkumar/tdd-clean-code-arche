import { Duration } from "../interfaces/Duration";
import { AgeReporter } from "../interfaces/AgeReporter";

class WeeksReporter implements AgeReporter {
  private readonly weeksDuration: Duration;

  constructor(weeksDuration: Duration) {
    this.weeksDuration = weeksDuration;
  }

  selectDuration(ageInMillis: number): Duration | null {
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    const oneMonth = 30 * 24 * 60 * 60 * 1000;

    if (ageInMillis >= sevenDays && ageInMillis < oneMonth) {
      return this.weeksDuration;
    }

    return null;
  }
}

export { WeeksReporter };
