export interface Coin {
  readonly value: number;
  readonly name: string;
}

export const coins = new Map<number, Coin>([
  [1, { value: 1, name: "penny" }],
  [5, { value: 5, name: "nickel" }],
  [10, { value: 10, name: "dime" }],
  [25, { value: 25, name: "quarter" }],
]);

export const COFFEE_PRICE = 35;
