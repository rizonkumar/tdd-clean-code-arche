import { Duration } from "../interfaces/Duration";
import { DurationCollection } from "../interfaces/DurationCollection";

class DurationCollectionImpl implements DurationCollection {
  private readonly availableDurations: readonly Duration[];

  constructor(durations: readonly Duration[]) {
    this.availableDurations = durations;
  }

  durations(): readonly Duration[] {
    return this.availableDurations;
  }

  addDuration(duration: Duration): DurationCollection {
    return new DurationCollectionImpl([...this.availableDurations, duration]);
  }

  removeDuration(unitName: string): DurationCollection {
    const filtered = this.availableDurations.filter(
      (d) => d.unit() !== unitName
    );
    return new DurationCollectionImpl(filtered);
  }
}

export { DurationCollectionImpl };
