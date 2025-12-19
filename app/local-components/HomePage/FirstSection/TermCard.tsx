"use client";

import { useMemo } from "react";
import { PieChart, Pie, Cell, Label, ResponsiveContainer } from "recharts";

type TermData = {
  name: string;
  value: number;
  color: string;
};

const TermCard = ({
  year,
  term,
  data,
  totalSeats,
}: {
  year: number;
  term: string;
  data: TermData[];
  totalSeats: number;
}) => {
  // Compute derived values once
  const { chartData, termValue } = useMemo(() => {
    const used = data.reduce((sum, entry) => sum + entry.value, 0);
    const remaining = Math.max(totalSeats - used, 0);

    return {
      termValue: used,
      chartData: [
        ...data,
        {
          name: "Remaining",
          value: remaining,
          color: "#e5e7eb", // slate-200
        },
      ],
    };
  }, [data, totalSeats]);

  return (
    <div className="flex-1 min-w-[180px] rounded-2xl bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">
          {term} {year}
        </span>
        <span className="text-xs rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">
          Seats
        </span>
      </div>

      {/* Chart */}
      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              startAngle={180}
              endAngle={0}
              cx="50%"
              cy="80%"
              innerRadius={45}
              outerRadius={70}
              stroke="none"
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}

              {/* Center label */}
              <Label
                position="center"
                content={() => (
                  <text
                    x="50%"
                    y="80%"
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    <tspan
                      x="50%"
                      dy="-6"
                      className="fill-slate-900 text-lg font-semibold"
                    >
                      {termValue}
                    </tspan>
                    <tspan x="50%" dy="18" className="fill-slate-500 text-xs">
                      of {totalSeats}
                    </tspan>
                  </text>
                )}
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="mt-3 flex justify-between text-xs text-slate-500">
        <span>Used</span>
        <span>{Math.round((termValue / totalSeats) * 100)}%</span>
      </div>
    </div>
  );
};

export default TermCard;
