import { MedicalSystemFactory } from "../src/implementations/MedicalSystemFactory";
import { PatientImpl } from "../src/implementations/PatientImpl";
import { AgeCalculatorImpl } from "../src/calculators/AgeCalculatorImpl";
import { HoursReporter } from "../src/calculators/HoursReporter";
import { DaysReporter } from "../src/calculators/DaysReporter";
import { MonthsReporter } from "../src/calculators/MonthsReporter";
import { YearsReporter } from "../src/calculators/YearsReporter";
import { WeeksReporter } from "../src/calculators/WeeksReporter";
import { DecadesReporter } from "../src/calculators/DecadesReporter";
import { HoursDuration } from "../src/durations/HoursDuration";
import { DaysDuration } from "../src/durations/DaysDuration";
import { MonthsDuration } from "../src/durations/MonthsDuration";
import { YearsDuration } from "../src/durations/YearsDuration";
import { WeeksDuration } from "../src/durations/WeeksDuration";
import { DecadesDuration } from "../src/durations/DecadesDuration";

describe("Medical System - Age Calculator", () => {
  describe("Basic Age Reporting", () => {
    const calculator = MedicalSystemFactory.createDefaultAgeCalculator();

    it("should report age in hours for newborn (2 hours old)", () => {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
      const patient = MedicalSystemFactory.createPatient(
        "Baby John",
        twoHoursAgo
      );
      const result = calculator.reportAge(patient);
      expect(result).toBe("Baby John is 2 Hours old");
    });

    it("should report age in hours for infant (6 hours old)", () => {
      const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);
      const patient = MedicalSystemFactory.createPatient(
        "Baby Mary",
        sixHoursAgo
      );
      const result = calculator.reportAge(patient);
      expect(result).toBe("Baby Mary is 6 Hours old");
    });

    it("should report age in days for child (5 days old)", () => {
      const fiveDaysAgo = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
      const patient = MedicalSystemFactory.createPatient(
        "Child Alex",
        fiveDaysAgo
      );
      const result = calculator.reportAge(patient);
      expect(result).toBe("Child Alex is 5 Days old");
    });

    it("should report age in months for toddler (3 months old)", () => {
      const threeMonthsAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
      const patient = MedicalSystemFactory.createPatient(
        "Toddler Sam",
        threeMonthsAgo
      );
      const result = calculator.reportAge(patient);
      expect(result).toBe("Toddler Sam is 3 Months old");
    });

    it("should report age in years for adult (25 years old)", () => {
      const twentyFiveYearsAgo = new Date(
        Date.now() - 25 * 365 * 24 * 60 * 60 * 1000
      );
      const patient = MedicalSystemFactory.createPatient(
        "Adult Lisa",
        twentyFiveYearsAgo
      );
      const result = calculator.reportAge(patient);
      expect(result).toBe("Adult Lisa is 25 Years old");
    });

    it("should report age in years for elderly (75 years old)", () => {
      const seventyFiveYearsAgo = new Date(
        Date.now() - 75 * 365 * 24 * 60 * 60 * 1000
      );
      const patient = MedicalSystemFactory.createPatient(
        "Elderly Robert",
        seventyFiveYearsAgo
      );
      const result = calculator.reportAge(patient);
      expect(result).toBe("Elderly Robert is 75 Years old");
    });
  });

  describe("Edge Cases", () => {
    const calculator = MedicalSystemFactory.createDefaultAgeCalculator();

    it("should handle exactly 1 hour old", () => {
      const oneHourAgo = new Date(Date.now() - 1 * 60 * 60 * 1000);
      const patient = MedicalSystemFactory.createPatient("Patient", oneHourAgo);
      const result = calculator.reportAge(patient);
      expect(result).toBe("Patient is 1 Hour old");
    });

    it("should handle exactly 1 day old", () => {
      const oneDayAgo = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
      const patient = MedicalSystemFactory.createPatient("Patient", oneDayAgo);
      const result = calculator.reportAge(patient);
      expect(result).toBe("Patient is 1 Day old");
    });

    it("should handle exactly 1 month old", () => {
      const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const patient = MedicalSystemFactory.createPatient(
        "Patient",
        oneMonthAgo
      );
      const result = calculator.reportAge(patient);
      expect(result).toBe("Patient is 1 Month old");
    });

    it("should handle exactly 1 year old", () => {
      const oneYearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
      const patient = MedicalSystemFactory.createPatient("Patient", oneYearAgo);
      const result = calculator.reportAge(patient);
      expect(result).toBe("Patient is 1 Year old");
    });

    it("should handle very small age (< 1 hour)", () => {
      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
      const patient = MedicalSystemFactory.createPatient(
        "Patient",
        thirtyMinutesAgo
      );
      const result = calculator.reportAge(patient);
      expect(result).toBe("Patient age cannot be determined");
    });
  });

  describe("Dynamic Duration Management", () => {
    it("should add weeks duration and use it for appropriate ages", () => {
      const hoursDuration = new HoursDuration();
      const daysDuration = new DaysDuration();
      const weeksDuration = new WeeksDuration();
      const monthsDuration = new MonthsDuration();
      const yearsDuration = new YearsDuration();

      const reporters = [
        new HoursReporter(hoursDuration),
        new WeeksReporter(weeksDuration),
        new DaysReporter(daysDuration),
        new MonthsReporter(monthsDuration),
        new YearsReporter(yearsDuration),
      ];

      const calculatorWithWeeks = new AgeCalculatorImpl(reporters);

      const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
      const patient = MedicalSystemFactory.createPatient("Patient", tenDaysAgo);
      const result = calculatorWithWeeks.reportAge(patient);
      expect(result).toBe("Patient is 1 Week old");
    });

    it("should add decades duration and use it for appropriate ages", () => {
      const hoursDuration = new HoursDuration();
      const daysDuration = new DaysDuration();
      const monthsDuration = new MonthsDuration();
      const yearsDuration = new YearsDuration();
      const decadesDuration = new DecadesDuration();

      const reporters = [
        new HoursReporter(hoursDuration),
        new DaysReporter(daysDuration),
        new MonthsReporter(monthsDuration),
        new DecadesReporter(decadesDuration),
        new YearsReporter(yearsDuration),
      ];

      const calculatorWithDecades = new AgeCalculatorImpl(reporters);

      const fifteenYearsAgo = new Date(
        Date.now() - 15 * 365 * 24 * 60 * 60 * 1000
      );
      const patient = MedicalSystemFactory.createPatient(
        "Patient",
        fifteenYearsAgo
      );
      const result = calculatorWithDecades.reportAge(patient);
      expect(result).toBe("Patient is 1 Decade old");
    });
  });

  describe("Duration Collection Management", () => {
    it("should create default duration collection", () => {
      const collection = MedicalSystemFactory.createDefaultDurationCollection();
      expect(collection.durations()).toHaveLength(4);
    });

    it("should add duration to collection", () => {
      const collection = MedicalSystemFactory.createDefaultDurationCollection();
      const weeksDuration = new WeeksDuration();
      const newCollection = collection.addDuration(weeksDuration);

      expect(collection.durations()).toHaveLength(4);
      expect(newCollection.durations()).toHaveLength(5);
    });

    it("should remove duration from collection", () => {
      const collection = MedicalSystemFactory.createDefaultDurationCollection();
      const newCollection = collection.removeDuration("Hours");

      expect(collection.durations()).toHaveLength(4);
      expect(newCollection.durations()).toHaveLength(3);

      const hasHours = newCollection
        .durations()
        .some((d) => d.unit() === "Hours");
      expect(hasHours).toBe(false);
    });
  });

  describe("Polymorphism Verification", () => {
    it("should use correct reporter based on age (polymorphism)", () => {
      const hoursReporter = new HoursReporter(new HoursDuration());
      const daysReporter = new DaysReporter(new DaysDuration());
      const monthsReporter = new MonthsReporter(new MonthsDuration());
      const yearsReporter = new YearsReporter(new YearsDuration());

      const reporters = [
        hoursReporter,
        daysReporter,
        monthsReporter,
        yearsReporter,
      ];
      const calculator = new AgeCalculatorImpl(reporters);

      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
      const patient1 = new PatientImpl("Test1", twoHoursAgo);
      expect(calculator.reportAge(patient1)).toBe("Test1 is 2 Hours old");

      const fiveDaysAgo = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
      const patient2 = new PatientImpl("Test2", fiveDaysAgo);
      expect(calculator.reportAge(patient2)).toBe("Test2 is 5 Days old");

      const threeMonthsAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
      const patient3 = new PatientImpl("Test3", threeMonthsAgo);
      expect(calculator.reportAge(patient3)).toBe("Test3 is 3 Months old");

      const fiveYearsAgo = new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000);
      const patient4 = new PatientImpl("Test4", fiveYearsAgo);
      expect(calculator.reportAge(patient4)).toBe("Test4 is 5 Years old");
    });
  });

  describe("Patient Creation", () => {
    it("should create patient with correct name and birth date", () => {
      const birthDate = new Date("2020-01-01");
      const patient = MedicalSystemFactory.createPatient("John Doe", birthDate);

      expect(patient.name()).toBe("John Doe");
      expect(patient.birthDate().getTime()).toBe(birthDate.getTime());
    });

    it("should return new date instance (immutability)", () => {
      const birthDate = new Date("2020-01-01");
      const patient = new PatientImpl("John", birthDate);

      const returnedDate = patient.birthDate();
      returnedDate.setFullYear(2025);

      expect(patient.birthDate().getFullYear()).toBe(2020);
    });
  });
});
