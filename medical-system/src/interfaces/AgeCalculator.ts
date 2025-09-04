import { Patient } from "./Patient";

interface AgeCalculator {
  reportAge(patient: Patient): string;
}

export { AgeCalculator };
