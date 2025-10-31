"use client";
import { useEffect, useState } from "react";
import { TrendingDown, TrendingUp, Disc2 } from "lucide-react";

interface Recommendation {
  id: number;
  title: string;
  sdg: string;
  expectedReturn: string;
  expectedRisk: string;
}

const Recommended = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard/recommended`,
          { credentials: "include" }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch recommendations");
        }

        const data = await res.json();
        setRecommendations(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Loading recommendations...
      </p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="mt-6 bg-white rounded-2xl p-6 md:p-8">
      <p className="text-xl md:text-2xl font-semibold mb-5">
        Recommended for You
      </p>

      {recommendations.length === 0 ? (
        <p className="text-gray-500 text-center">
          No recommendations available
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

              <button className="mt-6 bg-base text-white py-3 rounded-lg flex items-center justify-center space-x-2">
                <Disc2 className="w-7 h-7 text-white" />
                <span className="text-lg font-bold">Invest</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommended;
