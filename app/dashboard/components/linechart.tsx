"use client";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  month: string;
  value: number;
}

const LineChartt = () => {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard/performance`,
          { credentials: "include" }
        );

        if (!res.ok) throw new Error("Failed to fetch performance data");

        const result = await res.json();
        setData(result); // Make sure backend returns [{ month: "Jan", value: 2 }, ...]
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
        <p className="text-gray-500">Loading chart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white backdrop-blur border border-white/20 p-6 rounded-2xl shadow-sm">
      <p className="text-2xl font-semibold mb-4">Monthly Performance</p>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="lineColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#597d4a" stopOpacity={1} />
                <stop offset="100%" stopColor="#597d4a" stopOpacity={1} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e0e0e0"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#2e2e2e", fontSize: 14 }}
              padding={{ left: 20, right: 20 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#2e2e2e", fontSize: 14 }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#597d4a",
                borderRadius: "6px",
                color: "#fff",
              }}
              labelStyle={{ fontWeight: "bold", color: "#fff" }}
              formatter={(value) => [`₦${value}k`, "Portfolio Value"]}
            />

            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#lineColor)"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                fill: "#7CB342",
                stroke: "#fff",
                strokeWidth: 2,
              }}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartt;
