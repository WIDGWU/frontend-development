"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SeatsGraph = ({
  rangeData,
  selectedRange,
  title,
  description,
  type = "year",
}: {
  rangeData: any[];
  selectedRange: number | null;
  title: string;
  description: string;
  type: "term" | "year";
}) => {
  console.log("selectedRange:", selectedRange);

  return (
    <div className="bg-white rounded-2xl w-full h-full p-6 shadow-sm">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-base font-semibold text-slate-800">{title}</h2>
        <p className="text-sm text-slate-500">
          Academic Years {selectedRange !== null && selectedRange - 4} –{" "}
          {selectedRange}
        </p>
      </div>

      {/* Subtle note */}
      <div className="mb-4 text-xs text-slate-400 max-w-xl">{description}</div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          data={rangeData}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f1f5f9"
            vertical={false}
          />

          <XAxis
            dataKey={type}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              fontSize: "12px",
            }}
            labelStyle={{ fontWeight: 600, color: "#334155" }}
          />

          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{
              fontSize: "12px",
              paddingBottom: "12px",
            }}
          />

          <Line
            type="monotone"
            dataKey="total_seats"
            name="Total Seats"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 5 }}
          />

          <Line
            type="monotone"
            dataKey="total_enrollment"
            name="Total Enrolled"
            stroke="#2563eb"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SeatsGraph;
