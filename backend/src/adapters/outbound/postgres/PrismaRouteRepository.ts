import { PrismaClient } from "@prisma/client";
import { IRouteRepository } from "../../../core/ports/IRouteRepository";

const prisma = new PrismaClient();

export class PrismaRouteRepository implements IRouteRepository {
  async getAll() {
    return prisma.route.findMany();
  }

  async getBaseline() {
    return prisma.route.findFirst({ where: { isBaseline: true } });
  }

  async setBaseline(id: number) {
    await prisma.route.updateMany({ data: { isBaseline: false } }); // remove old baseline
    await prisma.route.update({
      where: { id },
      data: { isBaseline: true },
    });
  }
}
