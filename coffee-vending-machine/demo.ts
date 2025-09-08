import { CoffeeMachine, coffeeConfigurations } from "./src";

console.log("=== Coffee Vending Machine Demo ===\n");

let machine = new CoffeeMachine();

console.log("1. Initial machine status:");
console.log(machine.getStatus());
console.log();

console.log("2. Inserting coins:");
machine = machine.insertCoin(25);
machine = machine.insertCoin(10);
console.log(
  `Inserted amount: $${(machine.getStatus().insertedAmount / 100).toFixed(2)}`
);
console.log();

console.log("3. Available coffee types:");
coffeeConfigurations.forEach((config, key) => {
  console.log(
    `- ${key}: ${config.name} (cream: ${config.hasCream}, sugar: ${config.hasSugar})`
  );
});
console.log();

console.log("4. Selecting black coffee:");
const blackCoffeeResult = machine.selectCoffee("black");
console.log(`Result: ${blackCoffeeResult.message}`);
if (blackCoffeeResult.change && blackCoffeeResult.change.length > 0) {
  console.log(
    `Change: ${blackCoffeeResult.change.map((c) => c.name).join(", ")}`
  );
}
console.log();

machine = new CoffeeMachine();
machine = machine.insertCoin(50);

console.log("5. Selecting cream coffee:");
const creamCoffeeResult = machine.selectCoffee("cream");
console.log(`Result: ${creamCoffeeResult.message}`);
if (creamCoffeeResult.change && creamCoffeeResult.change.length > 0) {
  const changeAmount = creamCoffeeResult.change.reduce(
    (sum, coin) => sum + coin.value,
    0
  );
  console.log(
    `Change: $${(changeAmount / 100).toFixed(2)} (${creamCoffeeResult.change
      .map((c) => c.name)
      .join(", ")})`
  );
}
console.log();

machine = new CoffeeMachine();
machine = machine.insertCoin(25).insertCoin(25);

console.log("6. Returning coins:");
const returnResult = machine.returnCoins();
console.log(`Result: ${returnResult.message}`);
console.log();

machine = new CoffeeMachine();
machine = machine.insertCoin(10);

console.log("7. Trying to buy with insufficient funds:");
const insufficientResult = machine.selectCoffee("black");
console.log(`Result: ${insufficientResult.message}`);
console.log();

console.log("8. Refilling dispensers:");
const refilledMachine = machine.refillDispensers();
console.log("Dispensers refilled to default amounts");
console.log(
  `Cup dispenser: ${refilledMachine.getStatus().dispensers.cup.amount}`
);
console.log(
  `Coffee dispenser: ${refilledMachine.getStatus().dispensers.coffee.amount}`
);

console.log("\n=== Demo Complete ===");
