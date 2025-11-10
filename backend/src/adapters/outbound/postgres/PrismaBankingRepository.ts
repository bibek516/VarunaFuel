import { PrismaClient } from "@prisma/client";
import { IBankingRepository } from "../../../core/ports/IBankingRepository";
const prisma = new PrismaClient();

export class PrismaBankingRepository implements IBankingRepository {

  async getBanked(year: number): Promise<number> {
    const entries = await prisma.bankEntry.findMany({ where: { year } });
    return entries.reduce((sum, e) => sum + e.amount_gco2eq, 0);
  }

  async addBank(amount: number, year: number): Promise<void> {
    await prisma.bankEntry.create({ data: { amount_gco2eq: amount, year }});
  }

  async applyBank(amount: number, year: number): Promise<void> {
    await prisma.bankEntry.create({ data: { amount_gco2eq: -amount, year }});
  }
}
