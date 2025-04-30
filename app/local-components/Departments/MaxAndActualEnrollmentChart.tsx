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

interface DepartmentStatistic {
  Course_Term_Code: string;
  Course_Count: number;
  Total_Max_Enrollment: number;
  Total_Actual_Enrollment: number;
  Total_Seats_Available: number;
}

interface DepartmentChartProps {
  springStatistics: DepartmentStatistic[];
  summerStatistics: DepartmentStatistic[];
  fallStatistics: DepartmentStatistic[];
  XAxisDataKey: string;
  YAxisDataKey: string;
  YAxisLabel: string;
  strokeColor: string;
}

// A more detailed type definition (optional, but better)
interface YearGroup {
  year: string;
  [key: string]: string | number; // For dynamic keys like "Spring_Total_Max_Enrollment"
}

const MaxAndActualEnrollmentChart = ({
  springStatistics,
  summerStatistics,
  fallStatistics,
  YAxisDataKey,
  YAxisLabel,
  strokeColor,
}: DepartmentChartProps) => {
  if (
    fallStatistics.length +
      springStatistics.length +
      summerStatistics.length ===
    0
  ) {
    return <div className="text-center p-4">No data available</div>;
  }

  const processedSpringData = springStatistics.map((item) => ({
    ...item,
    year: item.Course_Term_Code.slice(0, 4),
    semester: "Spring",
  }));

  const processedSummerData = summerStatistics.map((item) => ({
    ...item,
    year: item.Course_Term_Code.slice(0, 4),
    semester: "Summer",
  }));

  const processedFallData = fallStatistics.map((item) => ({
    ...item,
    year: item.Course_Term_Code.slice(0, 4),
    semester: "Fall",
  }));

  const allData = [
    ...processedSpringData,
    ...processedSummerData,
    ...processedFallData,
  ];

  const yearGroups: Record<string, YearGroup> = {};
  allData.forEach((item) => {
    if (!yearGroups[item.year]) {
      yearGroups[item.year] = { year: item.year };
    }

    yearGroups[item.year][`${item.semester}_${YAxisDataKey}`] =
      item[YAxisDataKey as keyof DepartmentStatistic];
  });

  const chartData = Object.values(yearGroups);

  return (
    <div className="bg-white rounded-xl w-full h-full">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
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
          <Legend />
          <Line
            type="monotone"
            dataKey={`Spring_${YAxisDataKey}`}
            name={`Spring ${YAxisLabel}`}
            stroke="#8884d8"
            strokeWidth={3}
            connectNulls={true}
          />
          <Line
            type="monotone"
            dataKey={`Summer_${YAxisDataKey}`}
            name={`Summer ${YAxisLabel}`}
            stroke="#82ca9d"
            strokeWidth={3}
            connectNulls={true}
          />
          <Line
            type="monotone"
            dataKey={`Fall_${YAxisDataKey}`}
            name={`Fall ${YAxisLabel}`}
            stroke={strokeColor}
            strokeWidth={3}
            connectNulls={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MaxAndActualEnrollmentChart;
