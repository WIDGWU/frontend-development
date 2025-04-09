import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DepartmentCourseCountChat = ({ departmentsCourseCount }) => {
  console.log(departmentsCourseCount);
  return (
    <div className="bg-white rounded-xl w-full h-full p-4 m-2">
      <div className="flex items-center justify-between my-4">
        <h4 className="text-xl font-semibold">
          Total Departments Count: {departmentsCourseCount.length}
        </h4>
      </div>
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={departmentsCourseCount}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Department" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="Courses_Count"
              name={"Course Count"}
              fill="#0072b2"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DepartmentCourseCountChat;
