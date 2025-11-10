import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PoolingService } from "../../infrastructure/PoolingService";

export default function PoolingPage() {
  const [year, setYear] = useState(2024);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["pool", year],
    queryFn: () => PoolingService.fetch(year),
  });

  const createPool = useMutation({
    mutationFn: () => PoolingService.create(year),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pool", year] }),
  });

  if (isLoading) return <p className="p-4">Loading...</p>;

  const item = data?.[0];
  if (!item) return <p className="p-4">No records found</p>;

  const valid = item.cb_after >= 0;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Pooling</h1>

      <input
        type="number"
        value={year}
        className="border p-2"
        onChange={(e) => setYear(Number(e.target.value))}
      />

      <div className="p-4 border rounded bg-gray-50 space-y-1">
        <p>CB Before: {item.cb_before.toFixed(2)}</p>
        <p>Banked: {item.banked.toFixed(2)}</p>
        <p>CB After: {item.cb_after.toFixed(2)}</p>
      </div>

      <button
        disabled={!valid}
        className={`px-4 py-2 rounded text-white ${valid ? "bg-blue-600" : "bg-gray-400"}`}
        onClick={() => createPool.mutate()}
      >
        Create Pool
      </button>
    </div>
  );
}
