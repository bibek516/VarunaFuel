import { useQuery } from "@tanstack/react-query";
import { CompareService } from "../../infrastructure/CompareService";

export default function ComparePage() {
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["compare"],
    queryFn: CompareService.compare,
  });

  if (isLoading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Compare Routes</h1>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Baseline GHG</th>
            <th className="p-2 border">Comparison GHG</th>
            <th className="p-2 border">% Difference</th>
            <th className="p-2 border">Compliant</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row, i) => (
            <tr key={i}>
              <td className="p-2 border">{row.baseline.ghgIntensity}</td>
              <td className="p-2 border">{row.comparison.ghgIntensity}</td>
              <td className="p-2 border">{row.percentDiff.toFixed(2)}%</td>
              <td className="p-2 border">
                {row.compliant ? "✅" : "❌"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// import { useQuery } from "@tanstack/react-query";
// import { CompareService } from "../../infrastructure/CompareService";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// export default function ComparePage() {
//   const { data = [], isLoading } = useQuery({
//     queryKey: ["comparison"],
//     queryFn: CompareService.list,
//   });

//   if (isLoading) return <p className="p-4">Loading...</p>;

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold">Compare GHG Intensity</h1>

//       <div className="overflow-x-auto">
//         <table className="min-w-full border text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border p-2">Route</th>
//               <th className="border p-2">Baseline</th>
//               <th className="border p-2">Comparison</th>
//               <th className="border p-2">% Difference</th>
//               <th className="border p-2">Compliance</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row: any, i: number) => (
//               <tr key={i}>
//                 <td className="border p-2">{row.comparison.routeId}</td>
//                 <td className="border p-2">{row.baseline.ghgIntensity}</td>
//                 <td className="border p-2">{row.comparison.ghgIntensity}</td>
//                 <td className="border p-2">{row.percentDiff.toFixed(2)}%</td>
//                 <td className="border p-2">
//                   {row.compliant ? "✅" : "❌"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Chart */}
//       <div className="w-full h-80">
//         <ResponsiveContainer>
//           <BarChart data={data.map(d => ({
//             routeId: d.comparison.routeId,
//             Baseline: d.baseline.ghgIntensity,
//             Comparison: d.comparison.ghgIntensity,
//           }))}>
//             <CartesianGrid />
//             <XAxis dataKey="routeId" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="Baseline" />
//             <Bar dataKey="Comparison" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }
