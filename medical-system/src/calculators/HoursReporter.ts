import { Duration } from "../interfaces/Duration";
import { AgeReporter } from "../interfaces/AgeReporter";

class HoursReporter implements AgeReporter {
  private readonly hoursDuration: Duration;

  constructor(hoursDuration: Duration) {
    this.hoursDuration = hoursDuration;
  }

  selectDuration(ageInMillis: number): Duration | null {
    const oneHour = 60 * 60 * 1000;
    const oneDay = 24 * 60 * 60 * 1000;

    if (ageInMillis >= oneHour && ageInMillis < oneDay) {
      return this.hoursDuration;
    }

    return null;
  }
}

export { HoursReporter };
