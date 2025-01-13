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
import { useEffect, useState } from "react";

const ComparisonBarChart = ({
  selectedTerm,
  yearlyBasedSeats,
}: {
  selectedTerm: string[];
  yearlyBasedSeats: any;
}) => {
  const [sampleData, setSampleData] = useState<any[]>([]);

  // Format the data for the bar chart
  useEffect(() => {
    const newSampleData = selectedTerm.map((term) => {
      const yearData = yearlyBasedSeats.find(
        (seat: any) => seat.year === parseInt(term.slice(0, 4))
      );
      return {
        name: term,
        seats: yearData ? yearData[term] : 0,
      };
    });
    setSampleData(newSampleData);
  }, [selectedTerm, yearlyBasedSeats]);

  return (
    <div className="bg-white rounded-xl w-full h-full p-4 m-2">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">
          Comparison bar chart for selected terms
        </h1>
      </div>
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={sampleData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="seats"
              fill="#56B4E9"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComparisonBarChart;
