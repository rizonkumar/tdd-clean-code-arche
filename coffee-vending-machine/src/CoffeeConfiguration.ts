export interface CoffeeConfiguration {
  readonly name: string;
  readonly hasCream: boolean;
  readonly hasSugar: boolean;
}

export const coffeeConfigurations = new Map<string, CoffeeConfiguration>([
  ["black", { name: "black", hasCream: false, hasSugar: false }],
  ["cream", { name: "cream", hasCream: true, hasSugar: false }],
  ["sugar", { name: "sugar", hasCream: false, hasSugar: true }],
  ["cream-sugar", { name: "cream-sugar", hasCream: true, hasSugar: true }],
]);
