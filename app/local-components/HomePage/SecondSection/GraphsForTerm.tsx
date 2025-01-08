"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { getReports } from "@/app/api/reports";

const ComparisonBarChart = dynamic(() => import("./ComparisonBarChart"));
const TermSelector = dynamic(() => import("./TermSelector"));

const GraphsForTerm = () => {
  const [yearlyBasedSeats, setYearlyBasedSeats] = useState<any>([]);
  const [selectedTerm, setSelectedTerm] = useState<string[]>([]);
  const [onlyYear, setOnlyYear] = useState<number[]>([]);

  const formatYearBasedSeats = (reports: any, year: number) => {
    const academicYear = `${year}-${year + 1}`;
    const springCode = `${year}01`;
    const summerCode = `${year}02`;
    const fallCode = `${year}03`;
    return {
      year,
      [fallCode]:
        reports[`Total Fall Seats Available for academic year ${academicYear}`],
      [springCode]:
        reports[
          `Total Spring Seats Available for academic year ${academicYear}`
        ],
      [summerCode]:
        reports[
          `Total Summer Seats Available for academic year ${academicYear}`
        ],
    };
  };

  useEffect(() => {
    const uniqueYears = Array.from(
      new Set(selectedTerm.map((term) => parseInt(term.slice(0, 4))))
    );
    setOnlyYear(uniqueYears);
  }, [selectedTerm]);

  useEffect(() => {
    const fetchReports = async () => {
      const reports = await Promise.all(
        onlyYear.map((year) => getReports(year))
      );
      const formatted = reports.map((report, index) =>
        formatYearBasedSeats(report, onlyYear[index])
      );

      setYearlyBasedSeats(formatted);
    };

    if (onlyYear.length > 0) {
      fetchReports();
    }
  }, [onlyYear]);

  return (
    <div>
      <h1 className="font-bold text-2xl mb-4">Comparison of different Terms</h1>
      <TermSelector
        selectedTerm={selectedTerm}
        setSelectedTerm={setSelectedTerm}
      />
      <div className="w-full flex items-center justify-center my-2">
        <ComparisonBarChart
          selectedTerm={selectedTerm}
          yearlyBasedSeats={yearlyBasedSeats}
        />
      </div>
    </div>
  );
};

export default GraphsForTerm;
