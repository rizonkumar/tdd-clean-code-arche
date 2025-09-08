import { CommissionCalculator } from "./src";

console.log("=== Commission Calculator Demo ===\n");

console.log("1. Individual Bonus Examples:");
console.log("Sales: 1200, Quota: 1100, Commission: 10%, Tax: 10%");
const individualCalc1 = new CommissionCalculator({
  sales: 1200,
  quota: 1100,
  commissionPercent: 10,
  taxPercent: 10,
});
const individualResult1 = individualCalc1.calculateIndividualBonus();
console.log(`Result: ${individualResult1.bonus}`);

console.log("\nSales: 1200, Quota: 1500, Commission: 10%, Tax: 10%");
const individualCalc2 = new CommissionCalculator({
  sales: 1200,
  quota: 1500,
  commissionPercent: 10,
  taxPercent: 10,
});
const individualResult2 = individualCalc2.calculateIndividualBonus();
console.log(`Result: ${individualResult2.bonus}`);

console.log("\nSales: 1200, Quota: 1200, Commission: 10%, Tax: 10%");
const individualCalc3 = new CommissionCalculator({
  sales: 1200,
  quota: 1200,
  commissionPercent: 10,
  taxPercent: 10,
});
const individualResult3 = individualCalc3.calculateIndividualBonus();
console.log(`Result: ${individualResult3.bonus}`);

console.log("\n2. Team Bonus Examples:");
console.log("Sales: 1200, Quota: 1100, Commission: 10%, Team Members: 4");
const teamCalc1 = new CommissionCalculator({
  sales: 1200,
  quota: 1100,
  commissionPercent: 10,
  taxPercent: 10,
});
const teamResult1 = teamCalc1.calculateTeamBonus(4);
console.log(`Result: ${teamResult1.bonus}`);

console.log("\nSales: 1200, Quota: 1500, Commission: 10%, Team Members: 4");
const teamCalc2 = new CommissionCalculator({
  sales: 1200,
  quota: 1500,
  commissionPercent: 10,
  taxPercent: 10,
});
const teamResult2 = teamCalc2.calculateTeamBonus(4);
console.log(`Result: ${teamResult2.bonus}`);

console.log("\nSales: 1200, Quota: 1200, Commission: 10%, Team Members: 4");
const teamCalc3 = new CommissionCalculator({
  sales: 1200,
  quota: 1200,
  commissionPercent: 10,
  taxPercent: 10,
});
const teamResult3 = teamCalc3.calculateTeamBonus(4);
console.log(`Result: ${teamResult3.bonus}`);

console.log("\nSales: 1200, Quota: 1100, Commission: 10%, Team Members: 0");
const teamCalc4 = new CommissionCalculator({
  sales: 1200,
  quota: 1100,
  commissionPercent: 10,
  taxPercent: 10,
});
const teamResult4 = teamCalc4.calculateTeamBonus(0);
console.log(`Result: ${teamResult4.bonus}`);

console.log("\n=== Demo Complete ===");
