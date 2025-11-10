import { useState } from "react";
import RoutesPage from "./adapters/ui/routes/RoutesPage";
import ComparePage from "./adapters/ui/compare/ComparePage";
import BankingPage from "./adapters/ui/banking/BankingPage";
import PoolingPage from "./adapters/ui/pooling/PoolingPage";

export default function App() {
  const [tab, setTab] = useState("routes");

  return (
    <div className="w-full max-w-6xl mx-auto">

      <nav className="flex justify-center gap-8 p-4 bg-white shadow rounded-lg mb-6">
        <button className={`${tab === "routes" ? "bg-blue-600 text-white" : "bg-gray-200"} px-4 py-2 rounded-md`} onClick={() => setTab("routes")}>
          Routes
        </button>
        <button className={`${tab === "compare" ? "bg-blue-600 text-white" : "bg-gray-200"} px-4 py-2 rounded-md`} onClick={() => setTab("compare")}>
          Compare
        </button>
        <button className={`${tab === "banking" ? "bg-blue-600 text-white" : "bg-gray-200"} px-4 py-2 rounded-md`} onClick={() => setTab("banking")}>
          Banking
        </button>
        <button className={`${tab === "pooling" ? "bg-blue-600 text-white" : "bg-gray-200"} px-4 py-2 rounded-md`} onClick={() => setTab("pooling")}>
          Pooling
        </button>
      </nav>


      {tab === "routes" && <RoutesPage />}
      {tab === "compare" && <ComparePage />}
      {tab === "banking" && <BankingPage />}
      {tab === "pooling" && <PoolingPage />}
    </div>
  );
}
