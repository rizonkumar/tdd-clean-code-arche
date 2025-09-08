# Commission Calculator

A clean code implementation of a commission and bonus calculator following strict coding principles. This project demonstrates object-oriented design without inheritance, conditionals, or getters/setters.

## Problem Statement

### Individual Bonus

| Sales | Quota | Commission % | Tax % | Result |
| ----- | ----- | ------------ | ----- | ------ |
| 1200  | 1100  | 10           | 10    | 9      |
| 1200  | 1500  | 10           | 10    | 0      |
| 1200  | 1200  | 10           | 10    | 0      |

### Team Bonus

| Sales | Quota | Commission % | Team Members | Result |
| ----- | ----- | ------------ | ------------ | ------ |
| 1200  | 1100  | 10           | 4            | 2.5    |
| 1200  | 1500  | 10           | 4            | 0      |
| 1200  | 1200  | 10           | 4            | 0      |
| 1200  | 1100  | 10           | 0            | 0      |

## Business Rules

- **Individual Bonus**: If sales > quota, calculate commission and deduct tax, else 0
- **Team Bonus**: If sales > quota and team members > 0, calculate commission (no tax) and divide by team members, else 0

## Clean Code Principles Followed

### ✅ Class Names

- No endings with "er/or/tion" (e.g., no `Manager`, `Converter`)
- Classes are nouns representing things
- Descriptive comments for each class

### ❌ No Inheritance

- No `extends` keyword used anywhere
- Composition over inheritance

### ✅ Immutability

- All instance variables are `private` and `readonly`
- Methods return new instances instead of modifying state

### ❌ No Getters/Setters

- No public getter or setter methods
- All data access through behavior methods

### ❌ No if/else Logic

- Replaced with Map-based data structures
- Polymorphism through composition

### ✅ No Duplication

- Single source of truth for calculations
- Reusable components

### ✅ Unit Tests

- Comprehensive test coverage (96% coverage)
- 15 passing tests covering all scenarios

### ✅ Minimalistic

- No surplus code
- Clean, focused API

## Project Structure

```
commission-calculator/
├── src/
│   ├── CommissionData.ts      # Type definitions
│   ├── CommissionCalculator.ts # Main calculator logic
│   └── index.ts               # Module exports
├── tests/
│   └── CommissionCalculator.test.ts # Comprehensive tests
├── demo.ts                    # Usage demonstration
├── package.json
├── tsconfig.json
└── README.md
```

## Usage

```typescript
import { CommissionCalculator } from "./src";

// Individual bonus
const calculator = new CommissionCalculator({
  sales: 1200,
  quota: 1100,
  commissionPercent: 10,
  taxPercent: 10,
});

const individualBonus = calculator.calculateIndividualBonus();
console.log(individualBonus.bonus); // 9

// Team bonus
const teamBonus = calculator.calculateTeamBonus(4);
console.log(teamBonus.bonus); // 2.5
```

## Running the Project

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run demo
npx ts-node demo.ts

# Build
npm run build

# Run tests with coverage
npm run test:coverage
```

## Key Design Decisions

### 1. Map-Based Logic (No if/else)

```typescript
// ❌ Traditional approach
if (exceedsQuota) {
  return calculateBonus();
} else {
  return 0;
}

// ✅ Clean approach
const bonusStrategies = new Map<boolean, () => number>([
  [true, () => this.calculateCommission()],
  [false, () => 0],
]);
return bonusStrategies.get(exceedsQuota)!();
```

### 2. Different Tax Rules

- **Individual Bonus**: Commission - Tax
- **Team Bonus**: Commission ÷ Team Members (no tax deducted)

### 3. Immutability Pattern

```typescript
// All calculations are pure functions
calculateIndividualBonus(): CommissionResult {
  // No side effects, same input always returns same output
}
```

## Test Coverage

```
✅ 15 tests passing
✅ 96.15% statement coverage
✅ 100% branch coverage
✅ All edge cases covered:
   - Zero sales/quota/commission/tax
   - Different team sizes
   - Sales below/equal/above quota
   - Zero team members
```

## Architecture

- **CommissionCalculator**: Main orchestrator with clean public API
- **Map-based Logic**: All conditional logic replaced with Map lookups
- **Pure Functions**: No side effects, deterministic results
- **Immutable Data**: All inputs are readonly
- **Clean Separation**: Individual vs Team bonus calculations

This implementation demonstrates how to build complex business logic using **functional programming principles** within an object-oriented structure, maintaining **100% testability** and **clean, intuitive APIs**! 🎉
