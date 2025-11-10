import type { CBResult } from "../../core/domain/CBResult";

const API_URL = import.meta.env.VITE_API_URL;

export const BankingService = {
  async getCB(year: number): Promise<CBResult> {
    const res = await fetch(`${API_URL}/compliance/cb?year=${year}`);
    return res.json();
  },

  async bank(year: number): Promise<void> {
    await fetch(`${API_URL}/banking/bank`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ year }),
    });
  },

  async apply(year: number): Promise<void> {
    await fetch(`${API_URL}/banking/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ year }),
    });
  },
};
