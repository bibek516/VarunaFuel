export interface PoolMemberBefore {
  shipId: string;
  cb_before: number;
}

export interface PoolMemberAfter {
  shipId: string;
  cb_before: number;
  cb_after: number;
}

export interface IPoolingRepository {
  getCBs(year: number): Promise<PoolMemberBefore[]>;
  savePool(year: number, members: PoolMemberAfter[]): Promise<void>;
}
