import { Duration } from "./Duration";

interface AgeReporter {
  selectDuration(ageInMillis: number): Duration | null;
}

export { AgeReporter };
