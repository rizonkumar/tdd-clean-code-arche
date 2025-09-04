import { AgeCalculator } from "../interfaces/AgeCalculator";
import { Patient } from "../interfaces/Patient";
import { AgeReporter } from "../interfaces/AgeReporter";
import { Duration } from "../interfaces/Duration";

class AgeCalculatorImpl implements AgeCalculator {
  private readonly reporters: readonly AgeReporter[];

  constructor(reporters: readonly AgeReporter[]) {
    this.reporters = reporters;
  }

  reportAge(patient: Patient): string {
    const now = new Date();
    const ageInMillis = now.getTime() - patient.birthDate().getTime();

    const selectedDuration = this.selectAppropriateDuration(ageInMillis);

    if (!selectedDuration) {
      return `${patient.name()} age cannot be determined`;
    }

    const ageValue = Math.floor(ageInMillis / selectedDuration.milliseconds());
    const unitText =
      ageValue === 1 ? selectedDuration.singular() : selectedDuration.plural();

    return `${patient.name()} is ${ageValue} ${unitText} old`;
  }

  private selectAppropriateDuration(ageInMillis: number): Duration | null {
    for (const reporter of this.reporters) {
      const duration = reporter.selectDuration(ageInMillis);
      if (duration) {
        return duration;
      }
    }

    return null;
  }
}

export { AgeCalculatorImpl };
