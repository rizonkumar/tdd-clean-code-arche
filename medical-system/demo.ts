import { MedicalSystemFactory } from "./src/implementations/MedicalSystemFactory";
import { WeeksDuration } from "./src/durations/WeeksDuration";
import { WeeksReporter } from "./src/calculators/WeeksReporter";
import { AgeCalculatorImpl } from "./src/calculators/AgeCalculatorImpl";
import { HoursDuration } from "./src/durations/HoursDuration";
import { DaysDuration } from "./src/durations/DaysDuration";
import { MonthsDuration } from "./src/durations/MonthsDuration";
import { YearsDuration } from "./src/durations/YearsDuration";
import { HoursReporter } from "./src/calculators/HoursReporter";
import { DaysReporter } from "./src/calculators/DaysReporter";
import { MonthsReporter } from "./src/calculators/MonthsReporter";
import { YearsReporter } from "./src/calculators/YearsReporter";

console.log("=== Medical System Age Calculator Demo ===\n");

const calculator = MedicalSystemFactory.createDefaultAgeCalculator();

const newborn = MedicalSystemFactory.createPatient(
  "User 1",
  new Date(Date.now() - 6 * 60 * 60 * 1000)
);
const infant = MedicalSystemFactory.createPatient(
  "User 2",
  new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
);
const child = MedicalSystemFactory.createPatient(
  "User 3",
  new Date(Date.now() - 8 * 30 * 24 * 60 * 60 * 1000)
);
const adult = MedicalSystemFactory.createPatient(
  "User 4",
  new Date(Date.now() - 35 * 365 * 24 * 60 * 60 * 1000)
);

console.log("Basic Age Reporting:");
console.log(calculator.reportAge(newborn));
console.log(calculator.reportAge(infant));
console.log(calculator.reportAge(child));
console.log(calculator.reportAge(adult));

console.log("\n=== Extended Demo: Adding Weeks Support ===\n");

const hoursDuration = new HoursDuration();
const daysDuration = new DaysDuration();
const weeksDuration = new WeeksDuration();
const monthsDuration = new MonthsDuration();
const yearsDuration = new YearsDuration();

const reportersWithWeeks = [
  new HoursReporter(hoursDuration),
  new WeeksReporter(weeksDuration),
  new DaysReporter(daysDuration),
  new MonthsReporter(monthsDuration),
  new YearsReporter(yearsDuration),
];

const calculatorWithWeeks = new AgeCalculatorImpl(reportersWithWeeks);

const tenDaysOld = MedicalSystemFactory.createPatient(
  "Patient A",
  new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
);
const threeWeeksOld = MedicalSystemFactory.createPatient(
  "Patient B",
  new Date(Date.now() - 21 * 24 * 60 * 60 * 1000)
);
const eightDaysOld = MedicalSystemFactory.createPatient(
  "Patient C",
  new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
);

console.log("With Weeks Support:");
console.log(calculatorWithWeeks.reportAge(eightDaysOld));
console.log(calculatorWithWeeks.reportAge(tenDaysOld));
console.log(calculatorWithWeeks.reportAge(threeWeeksOld));

console.log("\n=== Demo Complete ===");
