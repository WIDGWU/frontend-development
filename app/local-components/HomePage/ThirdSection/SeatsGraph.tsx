"use client";

import Image from "next/image";
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
import moreIcon from "@/assets/moreDark.png";

const SeatsGraph = ({
  rangeData,
  selectedRange,
}: {
  rangeData: any[];
  selectedRange: number | null;
}) => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4 m-2">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">
          Seats Available vs Enrolled Seats from {selectedRange} to{" "}
          {selectedRange !== null && selectedRange - 4}
        </h1>
        <Image src={moreIcon} alt="" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={rangeData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="year"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={20}
          />
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line
            type="monotone"
            dataKey="total_seats"
            name="Total Seats"
            stroke="#E69F00"
            strokeWidth={5}
          />
          <Line
            type="monotone"
            dataKey="total_enrollment"
            name="Total Enrolled"
            stroke="#0072B2"
            strokeWidth={5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SeatsGraph;
