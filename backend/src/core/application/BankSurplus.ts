import { IBankingRepository } from "../ports/IBankingRepository";

export class BankSurplus {
  constructor(private bankRepo: IBankingRepository) {}

  async execute(amount: number, year: number, cbBefore: number) {
    if (cbBefore <= 0) throw new Error("No surplus to bank");
    if (amount > cbBefore) throw new Error("Amount exceeds surplus");

    await this.bankRepo.addBank(amount, year);

    const cb_after = cbBefore - amount;
    return { cb_before: cbBefore, applied: amount, cb_after };
  }
}
