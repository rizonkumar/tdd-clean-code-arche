import { Duration } from "../interfaces/Duration";
import { AgeReporter } from "../interfaces/AgeReporter";

class DecadesReporter implements AgeReporter {
  private readonly decadesDuration: Duration;

  constructor(decadesDuration: Duration) {
    this.decadesDuration = decadesDuration;
  }

  selectDuration(ageInMillis: number): Duration | null {
    const tenYears = 10 * 365 * 24 * 60 * 60 * 1000;

    if (ageInMillis >= tenYears) {
      return this.decadesDuration;
    }

    return null;
  }
}

export { DecadesReporter };
