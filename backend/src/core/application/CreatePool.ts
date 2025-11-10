import { IPoolingRepository } from "../ports/IPoolingRepository";

export class CreatePool {
  constructor(private repo: IPoolingRepository) {}

  async execute(shipIds: string[], year: number) {
    const cbList = await this.repo.getCBs(year);
    const members = cbList.filter(m => shipIds.includes(m.shipId));

    const sum = members.reduce((s, m) => s + m.cb_before, 0);
    if (sum < 0) throw new Error("Pool total must be ≥ 0");

    const surplus = members.filter(m => m.cb_before > 0).sort((a, b) => b.cb_before - a.cb_before);
    const deficit = members.filter(m => m.cb_before < 0).sort((a, b) => a.cb_before - b.cb_before);

    for (const d of deficit) {
      for (const s of surplus) {
        if (d.cb_before >= 0) break;
        const transfer = Math.min(s.cb_before, Math.abs(d.cb_before));
        s.cb_before -= transfer;
        d.cb_before += transfer;
      }
    }

    const result = members.map(m => ({
      shipId: m.shipId,
      cb_before: cbList.find(x => x.shipId === m.shipId)!.cb_before,
      cb_after: m.cb_before
    }));

    if (result.some(m => m.cb_after < 0))
      throw new Error("A surplus ship became negative or deficit worsened");

    await this.repo.savePool(year, result);

    return result;
  }
}
