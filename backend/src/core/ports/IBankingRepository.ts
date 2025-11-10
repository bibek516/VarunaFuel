export interface IBankingRepository {
  getBanked(year: number): Promise<number>;
  addBank(amount: number, year: number): Promise<void>;
  applyBank(amount: number, year: number): Promise<void>;
}
