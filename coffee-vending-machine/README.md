# Coffee Vending Machine

A clean code implementation of a coffee vending machine following strict coding principles. This project demonstrates object-oriented design without inheritance, conditionals, or getters/setters.

## Features

- **4 Coffee Types**: Black, Cream, Sugar, Cream & Sugar
- **American Coins**: Penny (1¢), Nickel (5¢), Dime (10¢), Quarter (25¢)
- **Price**: $0.35 per coffee
- **Dispensers**: Cup, Hot Water, Coffee Powder, Cream Powder, Sugar
- **Operations**: Accept money, Select coffee, Dispense coffee, Return change, Refill dispensers
- **Boundary Conditions**: Insufficient funds, insufficient inventory

## Clean Code Principles Followed

### ✅ Class Names

- No endings with "er/or/tion" (e.g., no `Manager`, `Converter`)
- Classes are nouns representing things
- Descriptive comments for each class

### ❌ No Inheritance

- No `extends` keyword used anywhere
- Composition over inheritance

### ✅ Immutability

- All instance variables are `private` and `final` (readonly)
- Methods return new instances instead of modifying state

### ❌ No Getters/Setters

- No public getter or setter methods
- All data access through behavior methods

### ❌ No if/else Logic

- Replaced with Map-based data structures
- Polymorphism through composition

### ✅ No Duplication

- Single source of truth for configurations
- Reusable components

### ✅ Unit Tests

- Comprehensive test coverage
- 29 passing tests

### ✅ Minimalistic

- No surplus code
- Clean, focused API

## Project Structure

```
coffee-vending-machine/
├── src/
│   ├── CoffeeConfiguration.ts    # Coffee type definitions
│   ├── Coin.ts                   # Coin and pricing constants
│   ├── Dispenser.ts              # Inventory management
│   ├── MoneyCalculator.ts        # Payment and change calculation
│   ├── CoffeeMachine.ts          # Main machine logic
│   └── index.ts                  # Module exports
├── tests/
│   └── CoffeeMachine.test.ts     # Comprehensive test suite
├── demo.ts                       # Usage demonstration
├── package.json
├── tsconfig.json
└── README.md
```

## Usage

```typescript
import { CoffeeMachine } from "./src";

// Create machine
let machine = new CoffeeMachine();

// Insert coins
machine = machine.insertCoin(25); // quarter
machine = machine.insertCoin(10); // dime

// Select coffee
const result = machine.selectCoffee("black");
console.log(result.message); // "Coffee dispensed successfully"

// Check status
const status = machine.getStatus();
console.log(status.isReady); // true/false
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
```

## Key Design Decisions

1. **No Inheritance**: Used composition with data structures instead of class hierarchies
2. **Map-Based Logic**: Replaced if/else with Map lookups for all conditional logic
3. **Immutability**: All operations return new instances, preserving state
4. **Data-Driven**: Coffee configurations and requirements defined as data structures
5. **Clean API**: Simple, intuitive methods for all operations

## Test Coverage

The test suite covers:

- Initial machine state
- Coin insertion and validation
- Coffee selection for all types
- Inventory management and depletion
- Change calculation
- Error conditions (insufficient funds, empty dispensers)
- Refill operations
- Machine status reporting

## Architecture

- **CoffeeMachine**: Main orchestrator with clean public API
- **MoneyCalculator**: Handles payments and change using greedy algorithm
- **Data Structures**: Maps and readonly objects for configuration
- **Composition**: Classes work together without inheritance
- **Immutability**: Functional-style state transitions

This implementation demonstrates how to build complex business logic using clean code principles while maintaining testability and maintainability.
