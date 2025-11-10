// import { Route } from "../../../core/domain/Route";
import type { Route } from "../../../core/domain/Route";
export default function RouteTable({
  routes,
  onSetBaseline,
}: {
  routes: Route[];
  onSetBaseline: (id: number) => void;
}) {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2">Route ID</th>
          <th className="border p-2">Vessel</th>
          <th className="border p-2">Fuel</th>
          <th className="border p-2">Year</th>
          <th className="border p-2">GHG Intensity</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {routes.map((r) => (
          <tr key={r.id}>
            <td className="border p-2">{r.routeId}</td>
            <td className="border p-2">{r.vesselType}</td>
            <td className="border p-2">{r.fuelType}</td>
            <td className="border p-2">{r.year}</td>
            <td className="border p-2">{r.ghgIntensity}</td>
            <td className="border p-2">
              <button
                className={`px-3 py-1 rounded text-white ${
                  r.isBaseline ? "bg-green-600" : "bg-blue-600"
                }`}
                disabled={r.isBaseline}
                onClick={() => onSetBaseline(r.id)}
              >
                {r.isBaseline ? "Baseline" : "Set Baseline"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
