"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ComparisonBarChart = ({
  termBasedSeats,
}: {
  termBasedSeats: { name: string; seats: number }[];
}) => {
  return (
    <div className="bg-white rounded-2xl w-full h-full p-5 shadow-sm">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-800">
          Seats Offered by Term
        </h2>
        <p className="text-sm text-slate-500">
          Comparison of available seats across selected academic terms
        </p>
      </div>

      {/* Chart */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={termBasedSeats}
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickMargin={10}
            />

            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                fontSize: "0.875rem",
              }}
            />

            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{
                fontSize: "0.85rem",
                color: "#475569",
                paddingBottom: "10px",
              }}
            />

            <Bar
              dataKey="seats"
              name="Seats Offered"
              fill="#56B4E9"
              radius={[8, 8, 0, 0]}
              barSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComparisonBarChart;
