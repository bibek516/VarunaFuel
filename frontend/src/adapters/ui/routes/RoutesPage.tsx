// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { RouteService } from "../../infrastructure/RouteService";
// import { useState } from "react";
// import RouteTable from "./RouteTable";

// export default function RoutesPage() {
//   const queryClient = useQueryClient();
//   // const { data: routes = [], isLoading } = useQuery(["routes"], RouteService.list);
//   const { data: routes = [], isLoading } = useQuery({ queryKey: ["routes"], queryFn: RouteService.list });
//   const [vesselFilter, setVessel] = useState("");
//   const [fuelFilter, setFuel] = useState("");
//   const [yearFilter, setYear] = useState("");

//   const filtered = routes.filter(r =>
//     (vesselFilter ? r.vesselType === vesselFilter : true) &&
//     (fuelFilter ? r.fuelType === fuelFilter : true) &&
//     (yearFilter ? r.year.toString() === yearFilter : true)
//   );

//   const mutation = useMutation((id: number) => RouteService.setBaseline(id), {
//     onSuccess: () => queryClient.invalidateQueries(["routes"]),
//   });
//   console.log("Route list result:", routes);

//   if (isLoading) return <p className="p-4">Loading...</p>;

//   return (
//     <div className="p-5 space-y-4">
//       <h1 className="text-2xl font-semibold">Routes</h1>

//       {/* Filters */}
//       <div className="flex gap-3">
//         <select className="border p-2" onChange={e => setVessel(e.target.value)}>
//           <option value="">Vessel Type</option>
//           {Array.from(new Set(routes.map(r => r.vesselType))).map(v => <option key={v}>{v}</option>)}
//         </select>

//         <select className="border p-2" onChange={e => setFuel(e.target.value)}>
//           <option value="">Fuel Type</option>
//           {Array.from(new Set(routes.map(r => r.fuelType))).map(f => <option key={f}>{f}</option>)}
//         </select>

//         <select className="border p-2" onChange={e => setYear(e.target.value)}>
//           <option value="">Year</option>
//           {Array.from(new Set(routes.map(r => r.year))).map(y => <option key={y}>{y}</option>)}
//         </select>
//       </div>

//       <RouteTable routes={filtered} onSetBaseline={mutation.mutate} />
//     </div>
//   );
// }

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { RouteService } from "../../infrastructure/RouteService";
import { useState } from "react";
import RouteTable from "./RouteTable";

export default function RoutesPage() {
  const queryClient = useQueryClient();

  const { data: routes = [], isLoading } = useQuery({
    queryKey: ["routes"],
    queryFn: RouteService.list,
  });

  console.log("Route list:", routes);

  const [vesselFilter, setVessel] = useState("");
  const [fuelFilter, setFuel] = useState("");
  const [yearFilter, setYear] = useState("");

  const filtered = routes.filter((r) =>
    (vesselFilter ? r.vesselType === vesselFilter : true) &&
    (fuelFilter ? r.fuelType === fuelFilter : true) &&
    (yearFilter ? r.year.toString() === yearFilter : true)
  );

  const mutation = useMutation({
    mutationFn: (id: number) => RouteService.setBaseline(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["routes"] }),
  });

  if (isLoading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-5 space-y-4">
      <h1 className="text-2xl font-semibold">Routes</h1>

      <div className="flex gap-3">
        <select className="border p-2" onChange={(e) => setVessel(e.target.value)}>
          <option value="">Vessel Type</option>
          {Array.from(new Set(routes.map((r) => r.vesselType))).map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>

        <select className="border p-2" onChange={(e) => setFuel(e.target.value)}>
          <option value="">Fuel Type</option>
          {Array.from(new Set(routes.map((r) => r.fuelType))).map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>

        <select className="border p-2" onChange={(e) => setYear(e.target.value)}>
          <option value="">Year</option>
          {Array.from(new Set(routes.map((r) => r.year))).map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>
      </div>

      <RouteTable routes={filtered} onSetBaseline={mutation.mutate} />
    </div>
  );
}
