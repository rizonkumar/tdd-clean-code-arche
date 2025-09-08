export interface CommissionInput {
  readonly sales: number;
  readonly quota: number;
  readonly commissionPercent: number;
  readonly taxPercent: number;
}

export interface TeamCommissionInput extends CommissionInput {
  readonly teamMembers: number;
}

export interface CommissionResult {
  readonly bonus: number;
}
