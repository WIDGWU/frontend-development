"use client";
import { useMemo, useState } from "react";
import SeatsGraph from "./SeatsGraph";
import CoursesAvailable from "./CoursesAvailable";
import RangeSelector from "./RangeSelector";
import { getFiveYearReport } from "@/app/api/reports";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";

interface GraphsForFiveYearProps {
  filterValues: { startYear: number; range: string }[];
}

const GraphsForFiveYear = ({ filterValues }: GraphsForFiveYearProps) => {
  const [selectedRange, setSelectedRange] = useState<number | null>(null);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["fiveYearReport", selectedRange],
    queryFn: () => getFiveYearReport(selectedRange as number),
    enabled: selectedRange !== null, // 🔑 prevents running on mount
  });

  // Derive rangeData from the response
  const yearData = useMemo(() => {
    if (!data || selectedRange === null) return [];

    return data["yearData"] ?? [];
  }, [data, selectedRange]);

  const termData = useMemo(() => {
    if (!data || selectedRange === null) return [];

    return data["termData"] ?? [];
  }, [data, selectedRange]);

  return (
    <div>
      <h1 className="font-bold text-2xl mb-4">5 year reports</h1>

      <RangeSelector
        filterValues={filterValues}
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
      />

      {isLoading && (
        <div className="bg-white/50 min-h-[500px] flex items-center justify-center rounded-md">
          <LoaderCircle className="animate-spin" />
        </div>
      )}

      {isError && (
        <div className="bg-white/50 min-h-[500px] flex items-center justify-center rounded-md">
          <span>Error fetching data</span>
          <button className="ml-2" onClick={() => refetch()}>
            Retry
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <div>
          <div className="w-full flex items-start justify-center gap-4 py-6">
            <SeatsGraph
              title="Seats Available vs Enrolled by Year"
              description="Academic years are represented using term codes (e.g. 2023, 2024, 2025)."
              type="year"
              rangeData={yearData}
              selectedRange={selectedRange}
              />

            <CoursesAvailable
              title="Courses vs Sections Offered by Year"
              description="Academic years are represented using term codes (e.g. 2023, 2024, 2025)."
              type="year"
              rangeData={yearData}
              selectedRange={selectedRange}
            />
          </div>

          <div className="w-full space-y-4">
            <SeatsGraph
              title="Seats Available vs Enrolled by Term"
              description="Academic terms are represented using term codes (e.g. 202402, 202403, 202501)."
              type="term"
              rangeData={termData}
              selectedRange={selectedRange}
              />
            <CoursesAvailable
              title="Courses vs Sections Offered by Term"
              description="Academic terms are represented using term codes (e.g. 202402, 202403, 202501)."
              type="term"
              rangeData={termData}
              selectedRange={selectedRange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GraphsForFiveYear;
