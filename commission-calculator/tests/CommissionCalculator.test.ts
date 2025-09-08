import { CommissionCalculator } from "../src";

describe("CommissionCalculator", () => {
  describe("Individual Bonus", () => {
    it("should calculate bonus when sales exceed quota", () => {
      const calculator = new CommissionCalculator({
        sales: 1200,
        quota: 1100,
        commissionPercent: 10,
        taxPercent: 10,
      });

      const result = calculator.calculateIndividualBonus();
      expect(result.bonus).toBe(9);
    });

    it("should return zero bonus when sales are below quota", () => {
      const calculator = new CommissionCalculator({
        sales: 1200,
        quota: 1500,
        commissionPercent: 10,
        taxPercent: 10,
      });

      const result = calculator.calculateIndividualBonus();
      expect(result.bonus).toBe(0);
    });

    it("should return zero bonus when sales equal quota", () => {
      const calculator = new CommissionCalculator({
        sales: 1200,
        quota: 1200,
        commissionPercent: 10,
        taxPercent: 10,
      });

      const result = calculator.calculateIndividualBonus();
      expect(result.bonus).toBe(0);
    });

    it("should handle different commission and tax percentages", () => {
      const calculator = new CommissionCalculator({
        sales: 2000,
        quota: 1500,
        commissionPercent: 15,
        taxPercent: 20,
      });

      const result = calculator.calculateIndividualBonus();
      expect(result.bonus).toBe(60);
    });
  });

  describe("Team Bonus", () => {
    it("should calculate team bonus when sales exceed quota", () => {
      const calculator = new CommissionCalculator({
        sales: 1200,
        quota: 1100,
        commissionPercent: 10,
        taxPercent: 10,
      });

      const result = calculator.calculateTeamBonus(4);
      expect(result.bonus).toBe(2.5); // 10 / 4 = 2.5 (no tax on team bonus)
    });

    it("should return zero team bonus when sales are below quota", () => {
      const calculator = new CommissionCalculator({
        sales: 1200,
        quota: 1500,
        commissionPercent: 10,
        taxPercent: 10,
      });

      const result = calculator.calculateTeamBonus(4);
      expect(result.bonus).toBe(0);
    });

    it("should return zero team bonus when sales equal quota", () => {
      const calculator = new CommissionCalculator({
        sales: 1200,
        quota: 1200,
        commissionPercent: 10,
        taxPercent: 10,
      });

      const result = calculator.calculateTeamBonus(4);
      expect(result.bonus).toBe(0);
    });

    it("should return zero team bonus when team members is zero", () => {
      const calculator = new CommissionCalculator({
        sales: 1200,
        quota: 1100,
        commissionPercent: 10,
        taxPercent: 10,
      });

      const result = calculator.calculateTeamBonus(0);
      expect(result.bonus).toBe(0);
    });

    it("should handle different team sizes", () => {
      const calculator = new CommissionCalculator({
        sales: 1300,
        quota: 1000,
        commissionPercent: 20,
        taxPercent: 15,
      });

      const result = calculator.calculateTeamBonus(3);
      expect(result.bonus).toBe(20); // (1300-1000) * 0.2 / 3 = 60 / 3 = 20
    });

    it("should handle single team member", () => {
      const calculator = new CommissionCalculator({
        sales: 1200,
        quota: 1100,
        commissionPercent: 10,
        taxPercent: 10,
      });

      const result = calculator.calculateTeamBonus(1);
      expect(result.bonus).toBe(10); // (1200-1100) * 0.1 / 1 = 10 / 1 = 10
    });
  });

  describe("Edge Cases", () => {
    it("should handle zero sales", () => {
      const calculator = new CommissionCalculator({
        sales: 0,
        quota: 1000,
        commissionPercent: 10,
        taxPercent: 10,
      });

      const result = calculator.calculateIndividualBonus();
      expect(result.bonus).toBe(0);
    });

    it("should handle zero quota", () => {
      const calculator = new CommissionCalculator({
        sales: 1000,
        quota: 0,
        commissionPercent: 10,
        taxPercent: 10,
      });

      const result = calculator.calculateIndividualBonus();
      expect(result.bonus).toBe(90);
    });

    it("should handle zero commission percent", () => {
      const calculator = new CommissionCalculator({
        sales: 1200,
        quota: 1100,
        commissionPercent: 0,
        taxPercent: 10,
      });

      const result = calculator.calculateIndividualBonus();
      expect(result.bonus).toBe(0);
    });

    it("should handle zero tax percent", () => {
      const calculator = new CommissionCalculator({
        sales: 1200,
        quota: 1100,
        commissionPercent: 10,
        taxPercent: 0,
      });

      const result = calculator.calculateIndividualBonus();
      expect(result.bonus).toBe(10);
    });

    it("should handle high commission and tax percentages", () => {
      const calculator = new CommissionCalculator({
        sales: 2000,
        quota: 1000,
        commissionPercent: 50,
        taxPercent: 40,
      });

      const result = calculator.calculateIndividualBonus();
      expect(result.bonus).toBe(300);
    });
  });
});
