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
  userCreatedAt?: string; // 👈 optional, to know when to start
}

const LineChartt: React.FC<LineCharttProps> = ({ investments, userCreatedAt }) => {
  const chartData = useMemo(() => {
    if (!investments.length) return [];

    // 🧠 Start tracking from user creation date (or oldest investment)
    const startDate = userCreatedAt
      ? new Date(userCreatedAt)
      : new Date(
          Math.min(...investments.map((inv) => new Date(inv.createdAt).getTime()))
        );

    const now = new Date();
    const data: ChartData[] = [];

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const currentMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    const endMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // 📅 Loop monthly
    while (currentMonth <= endMonth) {
      const totalValue = investments.reduce((sum, inv) => {
        const invDate = new Date(inv.createdAt);
        if (invDate <= currentMonth) {
          const monthsPassed =
            (currentMonth.getFullYear() - invDate.getFullYear()) * 12 +
            (currentMonth.getMonth() - invDate.getMonth());
          const monthlyRate = inv.expectedReturn / 100 / 12;
          const projected =
            inv.amount * Math.pow(1 + monthlyRate, Math.max(monthsPassed, 0));
          return sum + projected;
        }
        return sum;
      }, 0);

      data.push({
        month: `${monthNames[currentMonth.getMonth()]}`,
        value: Math.round(totalValue / 1000), // Display in ₦ thousands
      });

      currentMonth.setMonth(currentMonth.getMonth() + 1);
    }

    return data;
  }, [investments, userCreatedAt]);

  if (!investments.length) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
        <p className="text-gray-500">No investment data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <p className="text-2xl font-semibold mb-4">Monthly Performance</p>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid stroke="#eaeaea" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={{ stroke: "#000", strokeWidth: 1 }}
              tickLine={false}
              tick={{ fill: "#111", fontSize: 14 }}
              interval="preserveStartEnd"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#111", fontSize: 14 }}
              tickFormatter={(value) => `${value}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#333",
                borderRadius: "6px",
                color: "#fff",
                border: "none",
              }}
              formatter={(value: number) => [`₦${value.toLocaleString()}k`, "Portfolio Value"]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3E563B" // smooth green line
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6, fill: "#3E563B", stroke: "#fff", strokeWidth: 2 }}
              animationDuration={1200}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center text-sm text-gray-500 mt-3">
        {`Tracking from ${
          chartData[0]?.month || "N/A"
        } to ${chartData[chartData.length - 1]?.month || "N/A"}`}
      </div>
    </div>
  );
};

export default LineChartt;
