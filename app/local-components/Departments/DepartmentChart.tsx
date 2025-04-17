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

// Add type definitions for props
interface DepartmentChartProps {
  departmentStatistics: any[];
  XAxisDataKey: string;
  YAxisDataKey: string;
  YAxisLabel: string;
  strokeColor: string;
}

const DepartmentChart = ({
  departmentStatistics,
  XAxisDataKey,
  YAxisDataKey,
  YAxisLabel,
  strokeColor,
}: DepartmentChartProps) => {
  // Check if data exists
  if (!departmentStatistics || departmentStatistics.length === 0) {
    return <div className="text-center p-4">No data available</div>;
  }

  return (
    <div className="bg-white rounded-xl w-full h-full">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={departmentStatistics}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey={XAxisDataKey}
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
            // tickFormatter={(value) => Math.round(value)}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={YAxisDataKey}
            name={YAxisLabel}
            stroke={strokeColor}
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DepartmentChart;
