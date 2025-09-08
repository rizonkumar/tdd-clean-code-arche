import { Coin, COFFEE_PRICE } from "./Coin";

export interface MoneyResult {
  readonly sufficient: boolean;
  readonly change: readonly Coin[];
  readonly message: string;
}

export class MoneyCalculator {
  private readonly price: number;

  constructor(price: number = COFFEE_PRICE) {
    this.price = price;
  }

  calculatePayment(insertedAmount: number): MoneyResult {
    const isSufficient = insertedAmount >= this.price;
    const changeAmount = insertedAmount - this.price;

    return {
      sufficient: isSufficient,
      change: this.calculateChange(changeAmount),
      message: this.getPaymentMessage(isSufficient, changeAmount),
    };
  }

  calculateChange(amount: number): readonly Coin[] {
    if (amount <= 0) return [];

    const change: Coin[] = [];
    let remaining = amount;

    const quarters = Math.floor(remaining / 25);
    for (let i = 0; i < quarters; i++) {
      change.push({ value: 25, name: "quarter" });
    }
    remaining %= 25;

    const dimes = Math.floor(remaining / 10);
    for (let i = 0; i < dimes; i++) {
      change.push({ value: 10, name: "dime" });
    }
    remaining %= 10;

    const nickels = Math.floor(remaining / 5);
    for (let i = 0; i < nickels; i++) {
      change.push({ value: 5, name: "nickel" });
    }
    remaining %= 5;

    for (let i = 0; i < remaining; i++) {
      change.push({ value: 1, name: "penny" });
    }

    return change;
  }

  private getPaymentMessage(sufficient: boolean, changeAmount: number): string {
    const insufficientMessage = `Insufficient funds. Need $${(
      this.price / 100
    ).toFixed(2)}`;
    const exactMessage = "Exact payment received";
    const changeMessage = `Change: $${(changeAmount / 100).toFixed(2)}`;

    const messageStrategies = new Map<boolean, Map<number, string>>([
      [false, new Map([[0, insufficientMessage]])],
      [
        true,
        new Map([
          [0, exactMessage],
          [1, changeMessage],
        ]),
      ],
    ]);

    const sufficientMessages = messageStrategies.get(sufficient);
    const changeKeyMap = new Map<boolean, number>([
      [true, 1],
      [false, 0],
    ]);
    const hasChange = changeAmount > 0;
    const changeKey = changeKeyMap.get(hasChange) ?? 0;
    return sufficientMessages?.get(changeKey) ?? "Unknown payment status";
  }
}
