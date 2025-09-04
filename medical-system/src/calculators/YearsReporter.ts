import { Duration } from "../interfaces/Duration";
import { AgeReporter } from "../interfaces/AgeReporter";

class YearsReporter implements AgeReporter {
  private readonly yearsDuration: Duration;

  constructor(yearsDuration: Duration) {
    this.yearsDuration = yearsDuration;
  }

  selectDuration(ageInMillis: number): Duration | null {
    const oneYear = 365 * 24 * 60 * 60 * 1000;

    if (ageInMillis >= oneYear) {
      return this.yearsDuration;
    }

    return null;
  }
}

export { YearsReporter };
