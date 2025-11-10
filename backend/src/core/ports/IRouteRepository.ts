import { Route } from "../domain/Route";

export interface IRouteRepository {
  getAll(): Promise<Route[]>;
  setBaseline(id: number): Promise<void>;
  getBaseline(): Promise<Route | null>;
}
