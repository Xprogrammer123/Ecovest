"use client";
import { useEffect, useState } from "react";
import { TrendingDown, TrendingUp, Disc2, BarChart3 } from "lucide-react";

interface Recommendation {
  id: number;
  title: string;
  sdg: string;
  expectedReturn: string;
  expectedRisk: string;
}

interface SimulationResult {
  projection: string;
  estimatedReturn: string;
}

const Recommended = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [simulationResult, setSimulationResult] =
    useState<SimulationResult | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/ai/generate`,
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res.ok) {
          if (res.status === 401)
            throw new Error("Please log in to see AI recommendations.");
          throw new Error("Failed to fetch recommendations.");
        }

        const data = await res.json();
        setRecommendations(data.aiPortfolio || []);
      } catch (err: any) {
        console.error("AI fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const handleSimulate = async (recId: number) => {
    setSimulating(true);
    setShowModal(true);
    setSimulationResult(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/invest/simulate`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ recommendationIndex: recId }),
        }
      );

      if (!res.ok) throw new Error("Failed to simulate investment.");

      const data = await res.json();
      setSimulationResult({
        projection: data.projection || "No projection available.",
        estimatedReturn: data.estimatedReturn || "N/A",
      });
    } catch (err: any) {
      console.error("Simulation error:", err);
      setSimulationResult({ projection: err.message, estimatedReturn: "N/A" });
    } finally {
      setSimulating(false);
    }
  };

  // ✨ Shimmer Loading UI
  if (loading) {
    return (
      <div className="mt-6 bg-white rounded-2xl p-6 md:p-8 animate-pulse">
        <p className="text-xl md:text-2xl font-semibold mb-5">
          Generating AI recommendations...
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl p-5 bg-gray-200 h-48"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 bg-white rounded-2xl p-6 md:p-8 text-center">
        <p className="text-red-500 font-medium mb-4">{error}</p>
        <p className="text-gray-500 text-sm">
          Try logging in again or refreshing the page.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 bg-white rounded-2xl p-6 md:p-8">
      <p className="text-xl md:text-2xl font-semibold mb-5">
        Recommended for You
      </p>

      {recommendations.length === 0 ? (
        <p className="text-gray-500 text-center">
          No AI recommendations yet. Try generating again later.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="rounded-2xl p-5 flex flex-col justify-between shadow-sm bg-[#f8f9f8] transition hover:shadow-md"
            >
              <div>
                <p className="font-semibold text-[#1c1c1c] text-[17px] mb-1">
                  {rec.title}
                </p>
                <p className="text-[#777] text-sm mb-4">{rec.sdg}</p>

                {/* Expected Return */}
                <div className="flex items-center font-normal gap-2 mb-3">
                  <div className="w-14 h-12 rounded-lg bg-white flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-base" />
                  </div>
                  <p className="text-[#426b1f] font-semibold ml-2">
                    {rec.expectedReturn}
                    <br />
                    <span className="text-[#8b8b8b] text-sm font-semibold">
                      Expected return
                    </span>
                  </p>
                </div>

                {/* Expected Risk */}
                <div className="flex items-center gap-2">
                  <div className="w-14 h-12 rounded-lg bg-white flex items-center justify-center">
                    <TrendingDown className="w-8 h-8 text-red-500" />
                  </div>
                  <p className="text-[#c53b3b] font-semibold">
                    {rec.expectedRisk}
                    <br />
                    <span className="text-[#8b8b8b] text-sm font-semibold">
                      Expected risk
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleSimulate(rec.id)}
                  className="flex-1 bg-[#e5f4ea] text-base py-3 rounded-lg flex items-center justify-center gap-2 font-bold text-[#426b1f]"
                >
                  <BarChart3 className="w-6 h-6" />
                  Simulate
                </button>

                <button className="flex-1 bg-base text-white py-3 rounded-lg flex items-center justify-center gap-2 font-bold">
                  <Disc2 className="w-6 h-6 text-white" />
                  Invest
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔮 Simulation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-11/12 max-w-md text-center shadow-lg">
            {simulating ? (
              <div className="animate-pulse">
                <p className="text-lg font-semibold mb-3">
                  Simulating investment...
                </p>
                <div className="h-5 bg-gray-200 rounded mb-2"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </div>
            ) : (
              <>
                <p className="text-xl font-bold mb-3 text-[#1c1c1c]">
                  Simulation Result
                </p>
                <p className="text-[#426b1f] font-medium mb-2">
                  Estimated Return: {simulationResult?.estimatedReturn}
                </p>
                <p className="text-gray-600 mb-5">
                  {simulationResult?.projection}
                </p>

                <button
                  onClick={() => setShowModal(false)}
                  className="bg-base text-white py-2 px-6 rounded-lg font-semibold"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommended;
