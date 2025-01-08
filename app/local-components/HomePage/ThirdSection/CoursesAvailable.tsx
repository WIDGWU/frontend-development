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
    sections_available: 4000,
    courses_available: 2400,
  },
  {
    year: "2019",
    sections_available: 3000,
    courses_available: 1398,
  },
  {
    year: "2020",
    sections_available: 2000,
    courses_available: 9800,
  },
  {
    year: "2021",
    sections_available: 2780,
    courses_available: 3908,
  },
  {
    year: "2022",
    sections_available: 1890,
    courses_available: 4800,
  },
  {
    year: "2023",
    sections_available: 2390,
    courses_available: 3800,
  },
  {
    year: "2024",
    sections_available: 3490,
    courses_available: 4300,
  },
];

const CoursesAvailable = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4 m-2">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">
          Sections Available vs Courses Seats for 2018 to 2024
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
            dataKey="sections_available"
            name="Seats Available"
            stroke="#56B4E9"
            strokeWidth={5}
          />
          <Line
            type="monotone"
            dataKey="courses_available"
            name="Enrolled Seats"
            stroke="#0072B2"
            strokeWidth={5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CoursesAvailable;
