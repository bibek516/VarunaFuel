import { IRouteRepository } from "../ports/IRouteRepository";

export class SetBaseline {
  constructor(private repo: IRouteRepository) {}

  async execute(id: number) {
    return await this.repo.setBaseline(id);
  }
}
