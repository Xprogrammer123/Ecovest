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
  month: string;
  value: number;
}

interface LineCharttProps {
  investments: Investment[];
  demoBalance?: number;
  invested?: number;
}

const LineChartt: React.FC<LineCharttProps> = ({
  investments,
  demoBalance = 0,
  invested = 0,
}) => {
  const chartData = useMemo(() => {
    if (!demoBalance || demoBalance === 0) return [];

    const now = new Date();
    const year = now.getFullYear();
    const currentMonth = now.getMonth(); // 0 = Jan
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Calculate monthly growth based on demoBalance & invested
    const totalMonths = currentMonth + 1; // from January → current month
    const growth = demoBalance - invested;
    const monthlyIncrease = totalMonths > 0 ? growth / totalMonths : 0;

    const data: ChartData[] = [];
    let currentValue = invested;

    for (let i = 0; i < 12; i++) {
      if (i <= currentMonth) {
        currentValue += monthlyIncrease;
      }
      data.push({
        month: `${monthNames[i]} ${year}`,
        value: Math.max(Math.round(currentValue / 1000), 0),
      });
    }

    return data;
  }, [demoBalance, invested]);

  if (!demoBalance || demoBalance === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
        <p className="text-gray-500">No portfolio data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <p className="text-2xl font-semibold mb-4">Portfolio Performance</p>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#111", fontSize: 13 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#111", fontSize: 13 }}
              tickFormatter={(v) => `₦${v}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                color: "#38c55f",
                borderRadius: "8px",
                border: "none",
              }}
              formatter={(v: number) => [`₦${v.toLocaleString()}k`, "Portfolio"]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3E563B"
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 6,
                fill: "#3E563B",
                stroke: "#fff",
                strokeWidth: 2,
              }}
              animationDuration={1200}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center text-sm text-gray-500 mt-3">
        {`Tracking portfolio from Jan ${new Date().getFullYear()} to ${
          chartData[chartData.length - 1]?.month || "N/A"
        }`}
      </div>
    </div>
  );
};

export default LineChartt;
