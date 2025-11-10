export interface PoolMember {
  shipId: string;
  cb_before: number;
  cb_after?: number;
}

export interface IPoolingService {
  getAdjusted(year: number): Promise<PoolMember[]>;
  createPool(members: string[], year: number): Promise<PoolMember[]>;
}
