"use client";
import { useEffect, useState } from "react";
import SeatsGraph from "./SeatsGraph";
import CoursesAvailable from "./CoursesAvailable";
import RangeSelector from "./RangeSelector";
import { getFiveYearReport } from "@/app/api/reports";

interface GraphsForFiveYearProps {
  filterValues: string[];
}

const GraphsForFiveYear = ({ filterValues }: GraphsForFiveYearProps) => {
  const [selectedRange, setSelectedRange] = useState<number | null>(null);
  const [rangeData, setRangeData] = useState<any[]>([]);

  // Fetch data for the selected range
  useEffect(() => {
    if (selectedRange !== null) {
      getFiveYearReport(selectedRange).then((data) => {
        const endYear = selectedRange;
        const startYear = endYear - 4;
        const key = `Individual Year Data for last 5 years (${startYear}-${endYear})`;
        const rangeData = data[key];
        setRangeData(rangeData);
      });
    }
  }, [selectedRange]);

  return (
    <div>
      <h1 className="font-bold text-2xl mb-4">5 year reports</h1>
      <RangeSelector
        filterValues={filterValues}
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
      />
      <div className="w-full h-[800px] flex items-start justify-center gap-4 py-6">
        <SeatsGraph rangeData={rangeData} selectedRange={selectedRange} />

        <CoursesAvailable rangeData={rangeData} selectedRange={selectedRange} />
      </div>
    </div>
  );
};

export default GraphsForFiveYear;
