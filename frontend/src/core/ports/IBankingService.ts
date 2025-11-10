export interface ComplianceBalance {
  cb_before: number;
  cb_after?: number;
  applied?: number;
}

export interface IBankingService {
  getCB(year: number): Promise<ComplianceBalance>;
  bank(amount: number, year: number): Promise<ComplianceBalance>;
  apply(amount: number, year: number): Promise<ComplianceBalance>;
}
