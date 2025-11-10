import type { Route } from "../domain/Route";

export interface CompareItem {
  baseline: Route;
  comparison: Route;
  percentDiff: number;
  compliant: boolean;
}

export interface ICompareService {
  compare(): Promise<CompareItem[]>;
}
