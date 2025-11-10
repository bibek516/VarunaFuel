import { IRouteRepository } from "../ports/IRouteRepository";

export class ComputeCB {
  constructor(private routesRepo: IRouteRepository) {}

  async execute(routeId: number) {
    const route = await this.routesRepo.findById(routeId);
    if (!route) throw new Error("Route not found");

    const TARGET = 89.3368;
    const energy = route.fuelConsumption * 41000; // MJ
    const cb = (TARGET - route.ghgIntensity) * energy;

    return cb; // positive = surplus, negative = deficit
  }
}
