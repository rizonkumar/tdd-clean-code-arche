import { AgeCalculator } from "../interfaces/AgeCalculator";
import { DurationCollection } from "../interfaces/DurationCollection";
import { Patient } from "../interfaces/Patient";

import { HoursDuration } from "../durations/HoursDuration";
import { DaysDuration } from "../durations/DaysDuration";
import { MonthsDuration } from "../durations/MonthsDuration";
import { YearsDuration } from "../durations/YearsDuration";

import { HoursReporter } from "../calculators/HoursReporter";
import { DaysReporter } from "../calculators/DaysReporter";
import { MonthsReporter } from "../calculators/MonthsReporter";
import { YearsReporter } from "../calculators/YearsReporter";

import { AgeCalculatorImpl } from "../calculators/AgeCalculatorImpl";
import { DurationCollectionImpl } from "./DurationCollectionImpl";
import { PatientImpl } from "./PatientImpl";

class MedicalSystemFactory {
  static createDefaultAgeCalculator(): AgeCalculator {
    const hoursDuration = new HoursDuration();
    const daysDuration = new DaysDuration();
    const monthsDuration = new MonthsDuration();
    const yearsDuration = new YearsDuration();

    const reporters = [
      new HoursReporter(hoursDuration),
      new DaysReporter(daysDuration),
      new MonthsReporter(monthsDuration),
      new YearsReporter(yearsDuration),
    ];

    return new AgeCalculatorImpl(reporters);
  }

  static createPatient(name: string, birthDate: Date): Patient {
    return new PatientImpl(name, birthDate);
  }

  static createDefaultDurationCollection(): DurationCollection {
    const durations = [
      new HoursDuration(),
      new DaysDuration(),
      new MonthsDuration(),
      new YearsDuration(),
    ];

    return new DurationCollectionImpl(durations);
  }
}

export { MedicalSystemFactory };
