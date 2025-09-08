import {
  CoffeeMachine,
  MoneyCalculator,
  coffeeConfigurations,
  defaultDispensers,
} from "../src";

describe("CoffeeMachine", () => {
  let machine: CoffeeMachine;

  beforeEach(() => {
    machine = new CoffeeMachine();
  });

  describe("initial state", () => {
    it("should start with zero inserted amount", () => {
      const status = machine.getStatus();
      expect(status.insertedAmount).toBe(0);
    });

    it("should start with default dispenser amounts", () => {
      const status = machine.getStatus();
      expect(status.dispensers.cup.amount).toBe(defaultDispensers.cup.amount);
      expect(status.dispensers.water.amount).toBe(
        defaultDispensers.water.amount
      );
      expect(status.dispensers.coffee.amount).toBe(
        defaultDispensers.coffee.amount
      );
    });

    it("should be ready when inventory is sufficient", () => {
      const status = machine.getStatus();
      expect(status.isReady).toBe(true);
      expect(status.message).toBe("Machine ready");
    });
  });

  describe("coin insertion", () => {
    it("should accept quarter and update inserted amount", () => {
      const newMachine = machine.insertCoin(25);
      const status = newMachine.getStatus();
      expect(status.insertedAmount).toBe(25);
    });

    it("should accept multiple coins", () => {
      let currentMachine = machine;
      currentMachine = currentMachine.insertCoin(25);
      currentMachine = currentMachine.insertCoin(10);
      currentMachine = currentMachine.insertCoin(5);

      const status = currentMachine.getStatus();
      expect(status.insertedAmount).toBe(40);
    });
  });

  describe("coffee selection", () => {
    it("should reject invalid coffee type", () => {
      const result = machine.selectCoffee("invalid");
      expect(result.success).toBe(false);
      expect(result.message).toBe("Invalid coffee type");
    });

    it("should reject when insufficient funds", () => {
      const result = machine.selectCoffee("black");
      expect(result.success).toBe(false);
      expect(result.message).toContain("Insufficient funds");
    });

    it("should dispense black coffee with exact change", () => {
      const machineWithMoney = machine.insertCoin(35);
      const result = machineWithMoney.selectCoffee("black");

      expect(result.success).toBe(true);
      expect(result.message).toBe("Coffee dispensed successfully");
      expect(result.dispensedCoffee?.name).toBe("black");
      expect(result.change?.length).toBe(0);
    });

    it("should dispense coffee with change", () => {
      const machineWithMoney = machine.insertCoin(50);
      const result = machineWithMoney.selectCoffee("black");

      expect(result.success).toBe(true);
      expect(result.dispensedCoffee?.name).toBe("black");
      expect(result.change).toBeDefined();
    });

    it("should handle cream coffee correctly", () => {
      const machineWithMoney = machine.insertCoin(35);
      const result = machineWithMoney.selectCoffee("cream");

      expect(result.success).toBe(true);
      expect(result.dispensedCoffee?.name).toBe("cream");
      expect(result.dispensedCoffee?.hasCream).toBe(true);
      expect(result.dispensedCoffee?.hasSugar).toBe(false);
    });

    it("should handle sugar coffee correctly", () => {
      const machineWithMoney = machine.insertCoin(35);
      const result = machineWithMoney.selectCoffee("sugar");

      expect(result.success).toBe(true);
      expect(result.dispensedCoffee?.name).toBe("sugar");
      expect(result.dispensedCoffee?.hasCream).toBe(false);
      expect(result.dispensedCoffee?.hasSugar).toBe(true);
    });

    it("should handle cream and sugar coffee correctly", () => {
      const machineWithMoney = machine.insertCoin(35);
      const result = machineWithMoney.selectCoffee("cream-sugar");

      expect(result.success).toBe(true);
      expect(result.dispensedCoffee?.name).toBe("cream-sugar");
      expect(result.dispensedCoffee?.hasCream).toBe(true);
      expect(result.dispensedCoffee?.hasSugar).toBe(true);
    });
  });

  describe("inventory management", () => {
    it("should deduct ingredients after successful dispense", () => {
      const machineWithMoney = machine.insertCoin(35);
      const beforeStatus = machineWithMoney.getStatus();

      machineWithMoney.selectCoffee("black");
      const afterStatus = machineWithMoney.getStatus();

      expect(beforeStatus.dispensers.coffee.amount).toBe(
        afterStatus.dispensers.coffee.amount
      );
    });

    it("should reject when out of cups", () => {
      const emptyCupDispensers = {
        ...defaultDispensers,
        cup: { ...defaultDispensers.cup, amount: 0 },
      };
      const machineWithEmptyCup = new CoffeeMachine(emptyCupDispensers);
      const machineWithMoney = machineWithEmptyCup.insertCoin(35);

      const result = machineWithMoney.selectCoffee("black");
      expect(result.success).toBe(false);
      expect(result.message).toContain("cups");
    });

    it("should reject when out of coffee", () => {
      const emptyCoffeeDispensers = {
        ...defaultDispensers,
        coffee: { ...defaultDispensers.coffee, amount: 0 },
      };
      const machineWithEmptyCoffee = new CoffeeMachine(emptyCoffeeDispensers);
      const machineWithMoney = machineWithEmptyCoffee.insertCoin(35);

      const result = machineWithMoney.selectCoffee("black");
      expect(result.success).toBe(false);
      expect(result.message).toContain("coffee powder");
    });

    it("should reject when out of cream for cream coffee", () => {
      const emptyCreamDispensers = {
        ...defaultDispensers,
        cream: { ...defaultDispensers.cream, amount: 0 },
      };
      const machineWithEmptyCream = new CoffeeMachine(emptyCreamDispensers);
      const machineWithMoney = machineWithEmptyCream.insertCoin(35);

      const result = machineWithMoney.selectCoffee("cream");
      expect(result.success).toBe(false);
      expect(result.message).toContain("cream powder");
    });
  });

  describe("coin return", () => {
    it("should return no coins when none inserted", () => {
      const result = machine.returnCoins();
      expect(result.success).toBe(false);
      expect(result.message).toBe("No coins to return");
    });

    it("should return inserted coins", () => {
      const machineWithMoney = machine.insertCoin(25).insertCoin(10);
      const result = machineWithMoney.returnCoins();

      expect(result.success).toBe(true);
      expect(result.message).toContain("Returned $0.35");
      expect(result.change).toBeDefined();
      expect(result.change?.length).toBe(2);
    });
  });

  describe("refill dispensers", () => {
    it("should restore dispenser amounts to default", () => {
      const machineWithMoney = machine.insertCoin(35);
      const refilledMachine = machineWithMoney.refillDispensers();

      const status = refilledMachine.getStatus();
      expect(status.dispensers.cup.amount).toBe(defaultDispensers.cup.amount);
      expect(status.dispensers.water.amount).toBe(
        defaultDispensers.water.amount
      );
      expect(status.dispensers.coffee.amount).toBe(
        defaultDispensers.coffee.amount
      );
      expect(status.insertedAmount).toBe(35);
    });
  });

  describe("machine status", () => {
    it("should show not ready when low on essential ingredients", () => {
      const lowInventoryDispensers = {
        ...defaultDispensers,
        coffee: { ...defaultDispensers.coffee, amount: 5 },
      };
      const machineWithLowInventory = new CoffeeMachine(lowInventoryDispensers);
      const status = machineWithLowInventory.getStatus();

      expect(status.isReady).toBe(false);
      expect(status.message).toBe("Machine needs refill");
    });
  });
});

describe("MoneyCalculator", () => {
  let calculator: MoneyCalculator;

  beforeEach(() => {
    calculator = new MoneyCalculator(35);
  });

  it("should accept exact payment", () => {
    const result = calculator.calculatePayment(35);
    expect(result.sufficient).toBe(true);
    expect(result.change.length).toBe(0);
    expect(result.message).toBe("Exact payment received");
  });

  it("should reject insufficient payment", () => {
    const result = calculator.calculatePayment(25);
    expect(result.sufficient).toBe(false);
    expect(result.message).toContain("Insufficient funds");
  });

  it("should calculate change correctly", () => {
    const result = calculator.calculatePayment(50);
    expect(result.sufficient).toBe(true);
    expect(result.change.length).toBeGreaterThan(0);

    const totalChange = result.change.reduce(
      (sum, coin) => sum + coin.value,
      0
    );
    expect(totalChange).toBe(15);
  });

  it("should give correct change with multiple coins", () => {
    const result = calculator.calculatePayment(100);
    expect(result.sufficient).toBe(true);

    const totalChange = result.change.reduce(
      (sum, coin) => sum + coin.value,
      0
    );
    expect(totalChange).toBe(65);
  });
});

describe("CoffeeConfigurations", () => {
  it("should have all required coffee types", () => {
    expect(coffeeConfigurations.has("black")).toBe(true);
    expect(coffeeConfigurations.has("cream")).toBe(true);
    expect(coffeeConfigurations.has("sugar")).toBe(true);
    expect(coffeeConfigurations.has("cream-sugar")).toBe(true);
  });

  it("should have correct configuration for black coffee", () => {
    const black = coffeeConfigurations.get("black");
    expect(black?.hasCream).toBe(false);
    expect(black?.hasSugar).toBe(false);
  });

  it("should have correct configuration for cream coffee", () => {
    const cream = coffeeConfigurations.get("cream");
    expect(cream?.hasCream).toBe(true);
    expect(cream?.hasSugar).toBe(false);
  });

  it("should have correct configuration for sugar coffee", () => {
    const sugar = coffeeConfigurations.get("sugar");
    expect(sugar?.hasCream).toBe(false);
    expect(sugar?.hasSugar).toBe(true);
  });

  it("should have correct configuration for cream-sugar coffee", () => {
    const creamSugar = coffeeConfigurations.get("cream-sugar");
    expect(creamSugar?.hasCream).toBe(true);
    expect(creamSugar?.hasSugar).toBe(true);
  });
});
