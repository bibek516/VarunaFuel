import { CompareItem } from "../../../core/ports/ICompareService";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ReferenceLine } from "recharts";

export default function CompareChart({ items }: { items: CompareItem[] }) {
  const data = items.map((i) => ({
    routeId: i.routeId,
    baseline: i.baselineIntensity,
    comparison: i.comparisonIntensity,
  }));

  return (
    <BarChart width={700} height={350} data={data}>
      <XAxis dataKey="routeId" />
      <YAxis />
      <Tooltip />
      <Legend />
      <ReferenceLine y={89.3368} stroke="black" strokeDasharray="4 4" label="Target" />
      <Bar dataKey="baseline" />
      <Bar dataKey="comparison" />
    </BarChart>
  );
}
