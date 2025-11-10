import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /routes
export async function getRoutesHandler(req: Request, res: Response) {
  const routes = await prisma.route.findMany();
  return res.json(routes);
}

// POST /routes/:id/baseline
export async function setBaselineHandler(req: Request, res: Response) {
  const id = Number(req.params.id);

  // Remove baseline from all
  await prisma.route.updateMany({
    data: { isBaseline: false },
  });

  // Set new baseline
  await prisma.route.update({
    where: { id },
    data: { isBaseline: true },
  });

  return res.json({ success: true });
}

// GET /routes/comparison
export async function getComparison(req: Request, res: Response) {
  const TARGET = 89.3368; // Regulation target

  const baseline = await prisma.route.findFirst({
    where: { isBaseline: true },
  });

  if (!baseline) {
    return res.status(400).json({ error: "No baseline route found" });
  }

  const routes = await prisma.route.findMany({
    where: { id: { not: baseline.id } },
  });

  const result = routes.map((r) => {
    const percentDiff = ((r.ghgIntensity / baseline.ghgIntensity) - 1) * 100;
    const compliant = r.ghgIntensity <= TARGET;

    return {
      baseline,
      comparison: r,
      percentDiff,
      compliant,
    };
  });

  return res.json(result);
}
