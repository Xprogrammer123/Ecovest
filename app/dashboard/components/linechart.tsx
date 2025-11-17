"use client";
import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Investment } from "@/app/types/investment";

interface ChartData {
  date: string;
  value: number;
}

interface LineCharttProps {
  investments: Investment[];
}

const LineChartt: React.FC<LineCharttProps> = ({ investments }) => {
  // ✅ Transform investment data into daily performance
  const chartData = useMemo(() => {
    if (!investments.length) return [];

    // Sort investments by creation date
    const sorted = [...investments].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    const oldestDate = new Date(sorted[0].createdAt);
    const currentDate = new Date();

    // Generate all days from first investment to now
    const days: ChartData[] = [];
    let currentDay = new Date(oldestDate);

    while (currentDay <= currentDate) {
      const dailyValue = investments.reduce((total, investment) => {
        const invDate = new Date(investment.createdAt);
        if (invDate <= currentDay) {
          // Calculate days since investment
          const diffDays = Math.floor(
            (currentDay.getTime() - invDate.getTime()) / (1000 * 60 * 60 * 24)
          );

          // Approximate daily growth (based on expected annual return)
          const dailyRate = investment.expectedReturn / 100 / 365;
          const projectedValue =
            investment.amount * Math.pow(1 + dailyRate, diffDays);

          return total + projectedValue;
        }
        return total;
      }, 0);

      days.push({
        date: currentDay.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        value: Math.round(dailyValue),
      });

      currentDay.setDate(currentDay.getDate() + 1);
    }

    return days;
  }, [investments]);

  if (!investments.length) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
        <p className="text-gray-500">No investment data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white backdrop-blur border border-white/20 p-6 rounded-2xl shadow-sm">
      <p className="text-2xl font-semibold mb-4">Daily Portfolio Performance</p>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 30, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="lineColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#597d4a" stopOpacity={1} />
                <stop offset="100%" stopColor="#597d4a" stopOpacity={0.6} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#2e2e2e", fontSize: 12 }}
              interval="preserveStartEnd"
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#2e2e2e", fontSize: 12 }}
              tickFormatter={(value) => `₦${value.toLocaleString()}`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#597d4a",
                borderRadius: "6px",
                color: "#fff",
                padding: "8px 12px",
              }}
              labelStyle={{
                fontWeight: "bold",
                color: "#fff",
                marginBottom: "4px",
              }}
              formatter={(value: number) => [`₦${value.toLocaleString()}`, "Portfolio Value"]}
              labelFormatter={(label) => `${label}`}
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

      <div className="mt-4 text-sm text-gray-500 text-center">
        {`Tracking from ${chartData[0]?.date || "N/A"} to ${
          chartData[chartData.length - 1]?.date || "N/A"
        }`}
      </div>
    </div>
  );
};

export default LineChartt;
