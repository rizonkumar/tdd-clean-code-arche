export interface Dispenser {
  readonly ingredient: string;
  readonly amount: number;
}

export interface DispenserCollection {
  readonly cup: Dispenser;
  readonly water: Dispenser;
  readonly coffee: Dispenser;
  readonly cream: Dispenser;
  readonly sugar: Dispenser;
}

export const defaultDispensers: DispenserCollection = {
  cup: { ingredient: "cup", amount: 50 },
  water: { ingredient: "water", amount: 100 },
  coffee: { ingredient: "coffee", amount: 100 },
  cream: { ingredient: "cream", amount: 50 },
  sugar: { ingredient: "sugar", amount: 50 },
};

export const coffeeRequirements = {
  cup: 1,
  water: 1,
  coffee: 1,
  cream: 0,
  sugar: 0,
};
