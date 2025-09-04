import { Patient } from "../interfaces/Patient";

class PatientImpl implements Patient {
  private readonly patientName: string;
  private readonly patientBirthDate: Date;

  constructor(name: string, birthDate: Date) {
    this.patientName = name;
    this.patientBirthDate = new Date(birthDate);
  }

  name(): string {
    return this.patientName;
  }

  birthDate(): Date {
    return new Date(this.patientBirthDate);
  }
}

export { PatientImpl };
