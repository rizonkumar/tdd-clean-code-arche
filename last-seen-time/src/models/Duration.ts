export class Duration {
  private readonly milliseconds: number;

  private constructor(milliseconds: number) {
    this.milliseconds = milliseconds;
  }

  static ofHours(hours: number): Duration {
    return new Duration(hours * 60 * 60 * 1000);
  }

  static ofDays(days: number): Duration {
    return new Duration(days * 24 * 60 * 60 * 1000);
  }

  static ofMonths(months: number): Duration {
    return new Duration(months * 30 * 24 * 60 * 60 * 1000);
  }

  static ofYears(years: number): Duration {
    return new Duration(years * 365 * 24 * 60 * 60 * 1000);
  }

  static ofDecades(decades: number): Duration {
    return new Duration(decades * 10 * 365 * 24 * 60 * 60 * 1000);
  }

  toMilliseconds(): number {
    return this.milliseconds;
  }
}
