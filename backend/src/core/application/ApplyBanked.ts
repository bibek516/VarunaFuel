import { IBankingRepository } from "../ports/IBankingRepository";

export class ApplyBanked {
  constructor(private bankRepo: IBankingRepository) {}

  async execute(amount: number, year: number, cbBefore: number) {
    const available = await this.bankRepo.getBanked(year);
    if (available <= 0) throw new Error("No banked surplus available");
    if (amount > available) throw new Error("Amount exceeds banked surplus");

    await this.bankRepo.applyBank(amount, year);

    const cb_after = cbBefore + amount;
    return { cb_before: cbBefore, applied: amount, cb_after };
  }
}
