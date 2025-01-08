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

const data = [
  {
    year: "2018",
    seats_available: 4000,
    enrolled_seats: 2400,
  },
  {
    year: "2019",
    seats_available: 3000,
    enrolled_seats: 1398,
  },
  {
    year: "2020",
    seats_available: 2000,
    enrolled_seats: 9800,
  },
  {
    year: "2021",
    seats_available: 2780,
    enrolled_seats: 3908,
  },
  {
    year: "2022",
    seats_available: 1890,
    enrolled_seats: 4800,
  },
  {
    year: "2023",
    seats_available: 2390,
    enrolled_seats: 3800,
  },
  {
    year: "2024",
    seats_available: 3490,
    enrolled_seats: 4300,
  },
];

const SeatsGraph = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4 m-2">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">
          Seats Available vs Enrolled Seats for 2018 to 2024
        </h1>
        <Image src={moreIcon} alt="" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
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
            dataKey="seats_available"
            name="Seats Available"
            stroke="#E69F00"
            strokeWidth={5}
          />
          <Line
            type="monotone"
            dataKey="enrolled_seats"
            name="Enrolled Seats"
            stroke="#0072B2"
            strokeWidth={5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SeatsGraph;
