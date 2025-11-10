import { PrismaClient } from "@prisma/client";
import { IPoolingRepository, PoolMemberBefore, PoolMemberAfter } from "../../../core/ports/IPoolingRepository";

const prisma = new PrismaClient();

export class PrismaPoolingRepository implements IPoolingRepository {

  async getCBs(year: number): Promise<PoolMemberBefore[]> {
    const records = await prisma.shipCompliance.findMany({ where: { year } });
    return records.map(r => ({
      shipId: r.ship_id,
      cb_before: r.cb_gco2eq
    }));
  }

  async savePool(year: number, members: PoolMemberAfter[]): Promise<void> {
    const pool = await prisma.pool.create({ data: { year } });

    for (const m of members) {
      await prisma.poolMember.create({
        data: {
          poolId: pool.id,
          shipId: m.shipId,
          cb_before: m.cb_before,
          cb_after: m.cb_after
        }
      });
    }
  }
}
