import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAdjustedCB(req: Request, res: Response) {
  const year = Number(req.query.year);
  if (!year) return res.status(400).json({ error: "Year required" });

  // CB before pooling
  const entries = await prisma.bankEntry.aggregate({
    _sum: { amountGco2eq: true },
    where: { year }
  });

  const banked = entries._sum.amountGco2eq ?? 0;

  // Compute raw CB
  const routes = await prisma.route.findMany({ where: { year } });
  const TARGET_INTENSITY = 89.3368;
  const MJ = 41000;

  const cb_before = routes.reduce((sum, r) =>
    sum + (TARGET_INTENSITY - r.ghgIntensity) * (r.fuelConsumption * MJ),
    0
  );

  const cb_after = cb_before + banked;

  return res.json([
    { year, cb_before, banked, cb_after }
  ]);
}

export async function createPoolHandler(req: Request, res: Response) {
  const { year } = req.body;
  if (!year) return res.status(400).json({ error: "Year required" });

  // Calculate CB After Banking
  const adjusted = await prisma.bankEntry.aggregate({
    _sum: { amountGco2eq: true },
    where: { year }
  });

  const banked = adjusted._sum.amountGco2eq ?? 0;

  const routes = await prisma.route.findMany({ where: { year } });
  const TARGET_INTENSITY = 89.3368;
  const MJ = 41000;
  const cb_before = routes.reduce((sum, r) =>
    sum + (TARGET_INTENSITY - r.ghgIntensity) * (r.fuelConsumption * MJ),
    0
  );

  const cb_after = cb_before + banked;

  if (cb_after < 0) return res.status(400).json({ error: "Pool cannot be in deficit" });

  const pool = await prisma.pool.create({
    data: { year }
  });

  await prisma.poolMember.create({
    data: {
      poolId: pool.id,
      year,
      cbBefore: cb_before,
      cbAfter: cb_after
    }
  });

  return res.json({ message: "Pool created ✅", poolId: pool.id, cb_after });
}
