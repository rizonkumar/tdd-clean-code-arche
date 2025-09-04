import { Duration } from "./Duration";

export class LastSeenTime {
  private readonly lastOnline: Date;

  constructor(lastOnline: Date) {
    this.lastOnline = lastOnline;
  }

  report(name: string): string {
    const now = new Date();
    const diffMs = now.getTime() - this.lastOnline.getTime();

    if (diffMs >= Duration.ofDecades(1).toMilliseconds()) {
      const decades = Math.floor(
        diffMs / Duration.ofDecades(1).toMilliseconds()
      );
      return `${name} was online ${decades} decades ago`;
    }

    if (diffMs >= Duration.ofYears(1).toMilliseconds()) {
      const years = Math.floor(diffMs / Duration.ofYears(1).toMilliseconds());
      return `${name} was online ${years} years ago`;
    }

    if (diffMs >= Duration.ofMonths(1).toMilliseconds()) {
      const months = Math.floor(diffMs / Duration.ofMonths(1).toMilliseconds());
      return `${name} was online ${months} months ago`;
    }

    if (diffMs >= Duration.ofDays(7).toMilliseconds()) {
      const weeks = Math.floor(diffMs / Duration.ofDays(7).toMilliseconds());
      return `${name} was online ${weeks} weeks ago`;
    }

    if (diffMs >= Duration.ofDays(1).toMilliseconds()) {
      const days = Math.floor(diffMs / Duration.ofDays(1).toMilliseconds());
      return `${name} was online ${days} days ago`;
    }

    if (diffMs >= Duration.ofHours(1).toMilliseconds()) {
      const hours = Math.floor(diffMs / Duration.ofHours(1).toMilliseconds());
      return `${name} was online ${hours} hours ago`;
    }

    return `${name} was online just now`;
  }
}
