import type { CompareItem, ICompareService } from "../../core/ports/ICompareService";

const API_URL = import.meta.env.VITE_API_URL;

export const CompareService: ICompareService = {
  async compare() {
    const res = await fetch(`${API_URL}/routes/comparison`);
    return res.json() as Promise<CompareItem[]>;
  },
};
