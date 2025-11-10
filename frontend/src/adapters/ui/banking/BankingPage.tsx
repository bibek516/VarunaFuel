import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BankingService } from "../../infrastructure/BankingService";

export default function BankingPage() {
  const [year, setYear] = useState(2024);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["cb", year],
    queryFn: () => BankingService.getCB(year),
  });

  const bank = useMutation({
    mutationFn: () => BankingService.bank(year),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cb", year] }),
  });

  const apply = useMutation({
    mutationFn: () => BankingService.apply(year),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cb", year] }),
  });

  if (isLoading) return <p className="p-4">Loading...</p>;

  const disableBank = data.cb_before <= 0;
  const disableApply = data.cb_after >= 0;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Banking</h1>

      <label className="block">
        Year:
        <input
          type="number"
          className="border ml-2 p-1"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />
      </label>

      <div className="p-4 border rounded bg-gray-50">
        <p>CB Before: {data.cb_before.toFixed(2)}</p>
        <p>Applied: {data.applied.toFixed(2)}</p>
        <p>CB After: {data.cb_after.toFixed(2)}</p>
      </div>

      <button
        className={`px-4 py-2 rounded text-white ${
          disableBank ? "bg-gray-400" : "bg-blue-600"
        }`}
        disabled={disableBank}
        onClick={() => bank.mutate()}
      >
        Bank Surplus
      </button>

      <button
        className={`px-4 py-2 rounded text-white ${
          disableApply ? "bg-gray-400" : "bg-green-600"
        }`}
        disabled={disableApply}
        onClick={() => apply.mutate()}
      >
        Apply Banked Credit
      </button>
    </div>
  );
}
