export { MedicalSystemFactory } from "./implementations/MedicalSystemFactory";
export { PatientImpl } from "./implementations/PatientImpl";
export { DurationCollectionImpl } from "./implementations/DurationCollectionImpl";

// Duration exports
export { HoursDuration } from "./durations/HoursDuration";
export { DaysDuration } from "./durations/DaysDuration";
export { MonthsDuration } from "./durations/MonthsDuration";
export { YearsDuration } from "./durations/YearsDuration";
export { WeeksDuration } from "./durations/WeeksDuration";
export { DecadesDuration } from "./durations/DecadesDuration";

// Calculator exports
export { AgeCalculatorImpl } from "./calculators/AgeCalculatorImpl";
export { HoursReporter } from "./calculators/HoursReporter";
export { DaysReporter } from "./calculators/DaysReporter";
export { MonthsReporter } from "./calculators/MonthsReporter";
export { YearsReporter } from "./calculators/YearsReporter";
export { WeeksReporter } from "./calculators/WeeksReporter";
export { DecadesReporter } from "./calculators/DecadesReporter";

// Interface exports
export type { AgeCalculator } from "./interfaces/AgeCalculator";
export type { Patient } from "./interfaces/Patient";
export type { Duration } from "./interfaces/Duration";
export type { AgeReporter } from "./interfaces/AgeReporter";
export type { DurationCollection } from "./interfaces/DurationCollection";
