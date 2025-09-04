import { Duration } from "./Duration";

interface DurationCollection {
  durations(): readonly Duration[];

  addDuration(duration: Duration): DurationCollection;

  removeDuration(unitName: string): DurationCollection;
}

export { DurationCollection };
