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
import { Investment } from "@/app/types/investment"; // ✅ Shared type import

interface ChartData {
  month: string;
  value: number;
}

interface LineCharttProps {
  investments: Investment[];
}

const LineChartt: React.FC<LineCharttProps> = ({ investments }) => {
  // Transform investment data into monthly performance data
  const chartData = useMemo(() => {
    if (!investments.length) return [];

    // Get the date range
    const dates = investments.map((inv) => new Date(inv.createdAt));
    const oldestDate = new Date(Math.min(...dates.map((d) => d.getTime())));
    const currentDate = new Date();

    // Generate month array from oldest investment to now
    const months: ChartData[] = [];
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

    let currentMonth = new Date(oldestDate);
    currentMonth.setDate(1);

    while (currentMonth <= currentDate) {
      const monthValue = investments.reduce((total, investment) => {
        const investmentDate = new Date(investment.createdAt);

        if (investmentDate <= currentMonth) {
          const monthsSinceInvestment =
            (currentMonth.getFullYear() - investmentDate.getFullYear()) * 12 +
            (currentMonth.getMonth() - investmentDate.getMonth());

          const monthlyRate = investment.expectedReturn / 100 / 12;
          const projectedValue =
            investment.amount *
            Math.pow(1 + monthlyRate, monthsSinceInvestment);

          return total + projectedValue;
        }
        return total;
      }, 0);

      months.push({
        month: `${
          monthNames[currentMonth.getMonth()]
        } ${currentMonth.getFullYear()}`,
        value: Math.round(monthValue / 1000), // Convert to thousands (k)
      });

      // Move to next month
      currentMonth.setMonth(currentMonth.getMonth() + 1);
    }

    return months;
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
      <p className="text-2xl font-semibold mb-4">Portfolio Performance</p>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
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
              interval={"preserveStartEnd"}
              angle={-45}
              textAnchor="end"
              height={60}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#2e2e2e", fontSize: 14 }}
              tickFormatter={(value) => `₦${value}k`}
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
              formatter={(value: number) => [
                `₦${value.toLocaleString()}k`,
                "Portfolio Value",
              ]}
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
        {`Showing performance from ${chartData[0]?.month || "N/A"} to ${
          chartData[chartData.length - 1]?.month || "N/A"
        }`}
      </div>
    </div>
  );
};

export default LineChartt;
