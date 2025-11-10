import { CompareItem } from "../../../core/ports/ICompareService";

export default function CompareTable({ items }: { items: CompareItem[] }) {
  return (
    <table className="w-full border border-gray-300 text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2">Route</th>
          <th className="border p-2">Baseline (gCO₂e / MJ)</th>
          <th className="border p-2">Current</th>
          <th className="border p-2">% Difference</th>
          <th className="border p-2">Compliant</th>
        </tr>
      </thead>
      <tbody>
        {items.map((r) => (
          <tr key={r.routeId}>
            <td className="border p-2">{r.routeId}</td>
            <td className="border p-2">{r.baselineIntensity.toFixed(2)}</td>
            <td className="border p-2">{r.comparisonIntensity.toFixed(2)}</td>
            <td className="border p-2">{r.percentDiff.toFixed(2)}%</td>
            <td className="border p-2 text-center">
              {r.compliant ? <span className="text-green-600">✅</span> : <span className="text-red-600">❌</span>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
