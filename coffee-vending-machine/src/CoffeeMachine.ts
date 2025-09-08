import {
  CoffeeConfiguration,
  coffeeConfigurations,
} from "./CoffeeConfiguration";
import { Coin, COFFEE_PRICE } from "./Coin";
import {
  DispenserCollection,
  defaultDispensers,
  coffeeRequirements,
} from "./Dispenser";
import { MoneyCalculator } from "./MoneyCalculator";

export interface MachineStatus {
  readonly insertedAmount: number;
  readonly dispensers: DispenserCollection;
  readonly isReady: boolean;
  readonly message: string;
}

export interface OperationResult {
  readonly success: boolean;
  readonly message: string;
  readonly dispensedCoffee?: CoffeeConfiguration;
  readonly change?: readonly Coin[];
}

export class CoffeeMachine {
  private readonly calculator: MoneyCalculator;
  private readonly dispensers: DispenserCollection;
  private readonly insertedAmount: number;

  constructor(
    dispensers: DispenserCollection = defaultDispensers,
    insertedAmount: number = 0
  ) {
    this.calculator = new MoneyCalculator(COFFEE_PRICE);
    this.dispensers = dispensers;
    this.insertedAmount = insertedAmount;
  }

  insertCoin(coinValue: number): CoffeeMachine {
    const newAmount = this.insertedAmount + coinValue;
    return new CoffeeMachine(this.dispensers, newAmount);
  }

  selectCoffee(coffeeType: string): OperationResult {
    const config = coffeeConfigurations.get(coffeeType);
    if (!config) {
      return { success: false, message: "Invalid coffee type" };
    }

    const payment = this.calculator.calculatePayment(this.insertedAmount);
    if (!payment.sufficient) {
      return { success: false, message: payment.message };
    }

    const inventoryCheck = this.checkInventory(config);
    if (!inventoryCheck.sufficient) {
      return { success: false, message: inventoryCheck.message };
    }

    const newDispensers = this.deductIngredients(config);
    const newMachine = new CoffeeMachine(newDispensers, 0);

    return {
      success: true,
      message: "Coffee dispensed successfully",
      dispensedCoffee: config,
      change: payment.change,
    };
  }

  returnCoins(): OperationResult {
    if (this.insertedAmount === 0) {
      return { success: false, message: "No coins to return" };
    }

    const change = this.calculator.calculateChange(this.insertedAmount);
    const newMachine = new CoffeeMachine(this.dispensers, 0);

    return {
      success: true,
      message: `Returned $${(this.insertedAmount / 100).toFixed(2)}`,
      change: change,
    };
  }

  refillDispensers(): CoffeeMachine {
    return new CoffeeMachine(defaultDispensers, this.insertedAmount);
  }

  getStatus(): MachineStatus {
    const hasMinimumInventory = this.hasMinimumInventory();
    const statusMessageMap = new Map<boolean, string>([
      [true, "Machine ready"],
      [false, "Machine needs refill"],
    ]);

    return {
      insertedAmount: this.insertedAmount,
      dispensers: this.dispensers,
      isReady: hasMinimumInventory,
      message: statusMessageMap.get(hasMinimumInventory) ?? "Unknown status",
    };
  }

  private checkInventory(config: CoffeeConfiguration): {
    sufficient: boolean;
    message: string;
  } {
    const creamRequirementMap = new Map<boolean, number>([
      [true, 1],
      [false, 0],
    ]);
    const sugarRequirementMap = new Map<boolean, number>([
      [true, 1],
      [false, 0],
    ]);

    const requirements = {
      ...coffeeRequirements,
      cream: creamRequirementMap.get(config.hasCream) ?? 0,
      sugar: sugarRequirementMap.get(config.hasSugar) ?? 0,
    };

    const checkResults = [
      {
        condition: this.dispensers.cup.amount < requirements.cup,
        item: "cups",
      },
      {
        condition: this.dispensers.water.amount < requirements.water,
        item: "hot water",
      },
      {
        condition: this.dispensers.coffee.amount < requirements.coffee,
        item: "coffee powder",
      },
      {
        condition: this.dispensers.cream.amount < requirements.cream,
        item: "cream powder",
      },
      {
        condition: this.dispensers.sugar.amount < requirements.sugar,
        item: "sugar",
      },
    ];

    const insufficient = checkResults
      .filter((result) => result.condition)
      .map((result) => result.item);

    const resultMap = new Map<
      boolean,
      { sufficient: boolean; message: string }
    >([
      [
        true,
        {
          sufficient: false,
          message: `Insufficient: ${insufficient.join(", ")}`,
        },
      ],
      [false, { sufficient: true, message: "Inventory sufficient" }],
    ]);

    const hasInsufficient = insufficient.length > 0;
    return (
      resultMap.get(hasInsufficient) ?? {
        sufficient: false,
        message: "Unknown inventory status",
      }
    );
  }

  private deductIngredients(config: CoffeeConfiguration): DispenserCollection {
    const creamRequirementMap = new Map<boolean, number>([
      [true, 1],
      [false, 0],
    ]);
    const sugarRequirementMap = new Map<boolean, number>([
      [true, 1],
      [false, 0],
    ]);

    const requirements = {
      ...coffeeRequirements,
      cream: creamRequirementMap.get(config.hasCream) ?? 0,
      sugar: sugarRequirementMap.get(config.hasSugar) ?? 0,
    };

    return {
      cup: {
        ...this.dispensers.cup,
        amount: this.dispensers.cup.amount - requirements.cup,
      },
      water: {
        ...this.dispensers.water,
        amount: this.dispensers.water.amount - requirements.water,
      },
      coffee: {
        ...this.dispensers.coffee,
        amount: this.dispensers.coffee.amount - requirements.coffee,
      },
      cream: {
        ...this.dispensers.cream,
        amount: this.dispensers.cream.amount - requirements.cream,
      },
      sugar: {
        ...this.dispensers.sugar,
        amount: this.dispensers.sugar.amount - requirements.sugar,
      },
    };
  }

  private hasMinimumInventory(): boolean {
    return (
      this.dispensers.cup.amount >= 10 &&
      this.dispensers.water.amount >= 10 &&
      this.dispensers.coffee.amount >= 10
    );
  }
}
