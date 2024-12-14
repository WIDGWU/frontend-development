"use client";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Label, ResponsiveContainer } from "recharts";

type TermData = {
  name: string;
  value: number;
  color: string;
};

const cx = 150;
const cy = 200;
const iR = 50;
const oR = 100;

const TermCard = ({ term, data }: { term: string; data: TermData[] }) => {
  const [updatedData, setUpdatedData] = useState<TermData[]>([]);

  useEffect(() => {
    const totalValue = 5611;
    const dataValueSum = data.reduce((sum, entry) => sum + entry.value, 0);
    const remainingValue = totalValue - dataValueSum;

    const newData = [
      ...data,
      { name: "remaining", value: remainingValue, color: "#d3d3d3" },
    ];

    setUpdatedData(newData);
  }, [data]);

  const renderCustomizedLabel = ({ viewBox }: any) => {
    const termValue = data.reduce((sum, entry) => sum + entry.value, 0);
    const totalValue = 5611;
    return (
      <text
        x={viewBox.cx}
        y={viewBox.cy}
        fill="black"
        textAnchor="middle"
        dominantBaseline="central"
      >
        <tspan fontWeight="bold">{termValue}</tspan>/{totalValue}
      </text>
    );
  };

  return (
    <div className="rounded-2xl odd:bg-lamaPurple bg-white p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[14px]text-bold px-2 pt-1 rounded-full text-green-600">
          2024 {term} seats
        </span>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart width={500} height={300}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={updatedData}
            cx={cx}
            cy={cy}
            innerRadius={iR}
            outerRadius={oR}
            fill="#8884d8"
            stroke="none"
            labelLine={false}
          >
            {updatedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <Label content={renderCustomizedLabel} position="center" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TermCard;
