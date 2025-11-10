import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const TARGET_INTENSITY = 89.3368;      // gCO2e/MJ
const MJ_PER_TONNE = 41000;            // energy intensity assumption

// GET /compliance/cb?year=YYYY
export async function getCB(req: Request, res: Response) {
  const year = Number(req.query.year);
  if (!year) return res.status(400).json({ error: "year query param required" });

  // Routes of that year
  const routes = await prisma.route.findMany({ where: { year } });

  // CB = sum( (Target - Actual) * EnergyInScope )
  // EnergyInScope ~= fuelConsumption(t) * 41,000 MJ/t
  const cb_before = routes.reduce((sum, r) => {
    const energy = r.fuelConsumption * MJ_PER_TONNE;
    const delta = (TARGET_INTENSITY - r.ghgIntensity) * energy;
    return sum + delta;
  }, 0);

  // banked total for this year (positive=banked, negative=applied)
  const bankAgg = await prisma.bankEntry.aggregate({
    _sum: { amountGco2eq: true },
    where: { year },
  });
  const bankedTotal = bankAgg._sum.amountGco2eq ?? 0;

  // By default, applied = 0 in GET
  const applied = 0;
  const cb_after = cb_before + bankedTotal - applied;

  return res.json({
    year,
    cb_before,
    banked: bankedTotal,
    applied,
    cb_after,
  });
}

// POST /banking/bank  { year:number, amount:number }
export async function bank(req: Request, res: Response) {
  const bodySchema = z.object({
    year: z.number(),
    amount: z.number().positive("amount must be > 0"),
  });

  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { year, amount } = parsed.data;

  // Optional guard: do not bank if current CB (before banking) <= 0
  const routes = await prisma.route.findMany({ where: { year } });
  const cb_before = routes.reduce((sum, r) => {
    const energy = r.fuelConsumption * MJ_PER_TONNE;
    return sum + (TARGET_INTENSITY - r.ghgIntensity) * energy;
  }, 0);
  if (cb_before <= 0) {
    return res.status(400).json({ error: "CB is not positive; cannot bank." });
  }

  await prisma.bankEntry.create({
    data: { year, amountGco2eq: amount },
  });

  return res.json({ message: "Banked ✅", year, amount });
}

// POST /banking/apply  { year:number, amount:number }
export async function apply(req: Request, res: Response) {
  const bodySchema = z.object({
    year: z.number(),
    amount: z.number().positive("amount must be > 0"),
  });

  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { year, amount } = parsed.data;

  // check available banked
  const bankAgg = await prisma.bankEntry.aggregate({
    _sum: { amountGco2eq: true },
    where: { year },
  });
  const available = bankAgg._sum.amountGco2eq ?? 0;
  if (amount > available) {
    return res.status(400).json({ error: "Amount exceeds available banked surplus." });
  }

  // store as negative entry (consumption of bank)
  await prisma.bankEntry.create({
    data: { year, amountGco2eq: -amount },
  });

  return res.json({ message: "Applied ✅", year, amount });
}
