"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { getReportsByTerm } from "@/app/api/reports";

const ComparisonBarChart = dynamic(() => import("./ComparisonBarChart"));
const TermSelector = dynamic(() => import("./TermSelector"));

interface GraphsForTermProps {
  filterValues: string[];
}

const GraphsForTerm = ({ filterValues }: GraphsForTermProps) => {
  const [selectedTerm, setSelectedTerm] = useState<string[]>([]);
  const [onlyYear, setOnlyYear] = useState<number[]>([]);
  const [termBasedSeats, setTermBasedSeats] = useState<
    { name: string; seats: number }[]
  >([]);

  // Fetch the reports for the selected years
  useEffect(() => {
    const uniqueYears = Array.from(
      new Set(selectedTerm.map((term) => Number.parseInt(term.slice(0, 4))))
    );
    setOnlyYear(uniqueYears);
  }, [selectedTerm]);

  useEffect(() => {
    const fetchReports = async () => {
      const seatsReports = await Promise.all(
        selectedTerm.map((term) => getReportsByTerm(term))
      );

      const formattedSeats = seatsReports.map((report) => {
        return { name: report.term, seats: report.total_seats };
      });

      setTermBasedSeats(formattedSeats);
    };

    if (onlyYear.length > 0) {
      fetchReports();
    }
  }, [onlyYear, selectedTerm]);

  return (
    <div>
      <h1 className="font-bold text-xl mb-2">Per Term Seats Comparison</h1>
      <TermSelector
        filterValues={filterValues}
        selectedTerm={selectedTerm}
        setSelectedTerm={setSelectedTerm}
      />
      <div className="w-full flex items-center justify-center my-2">
        <ComparisonBarChart
          termBasedSeats={termBasedSeats}
        />
      </div>
    </div>
  );
};

export default GraphsForTerm;
