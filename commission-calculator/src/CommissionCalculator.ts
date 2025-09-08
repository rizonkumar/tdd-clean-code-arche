import { CommissionInput, CommissionResult } from "./CommissionData";

export class CommissionCalculator {
  private readonly input: CommissionInput;

  constructor(input: CommissionInput) {
    this.input = input;
  }

  calculateIndividualBonus(): CommissionResult {
    const exceedsQuota = this.input.sales > this.input.quota;

    const bonusStrategies = new Map<boolean, () => number>([
      [true, () => this.calculateCommission()],
      [false, () => 0],
    ]);

    const bonus = bonusStrategies.get(exceedsQuota)!();
    return { bonus };
  }

  calculateTeamBonus(teamMembers: number): CommissionResult {
    const exceedsQuota = this.input.sales > this.input.quota;
    const hasTeamMembers = teamMembers > 0;

    const teamBonusStrategies = new Map<boolean, Map<boolean, () => number>>([
      [
        true,
        new Map([
          [true, () => this.calculateCommissionWithoutTax() / teamMembers],
          [false, () => 0],
        ]),
      ],
      [
        false,
        new Map([
          [true, () => 0],
          [false, () => 0],
        ]),
      ],
    ]);

    const quotaStrategies = teamBonusStrategies.get(exceedsQuota);
    const bonus = quotaStrategies!.get(hasTeamMembers)!();

    return { bonus };
  }

  private calculateCommission(): number {
    const excessSales = this.input.sales - this.input.quota;
    const grossCommission = excessSales * (this.input.commissionPercent / 100);
    const taxAmount = grossCommission * (this.input.taxPercent / 100);

    return grossCommission - taxAmount;
  }

  private calculateCommissionWithoutTax(): number {
    const excessSales = this.input.sales - this.input.quota;
    return excessSales * (this.input.commissionPercent / 100);
  }
}
