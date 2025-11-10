import { IRouteRepository } from "../ports/IRouteRepository";

export class GetRoutes {
  constructor(private repo: IRouteRepository) {}

  async execute() {
    return await this.repo.getAll();
  }
}
