"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", value: 2 },
  { month: "Feb", value: 3 },
  { month: "Mar", value: 5 },
  { month: "Apr", value: 6 },
  { month: "May", value: 7 },
  { month: "Jun", value: 8 },
  { month: "Jul", value: 9 },
  { month: "Aug", value: 12 },
  { month: "Sep", value: 14 },
  { month: "Oct", value: 15 },
  { month: "Nov", value: 18 },
  { month: "Dec", value: 20 },
];

const LineChartt = () => {
  return (
    <div className="bg-white backdrop-blur- border border-white/20 p-6 rounded-2xl shadow-sm">
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
              stroke="#2e2e2e"
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
              domain={[0, 20]}
              ticks={[0, 5, 10, 15, 20]}
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
