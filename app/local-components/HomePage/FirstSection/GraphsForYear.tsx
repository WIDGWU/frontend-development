"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { getReports } from "@/app/api/reports";
import YearSelector from "@/app/local-components/HomePage/FirstSection/YearSelector";
const TermCard = dynamic(() => import("./TermCard"));
const DifferenceCard = dynamic(() => import("./DifferenceCard"));

const GraphsForYear = () => {
  const [formattedReports, setFormattedReports] = useState<any>({});
  const [year, setYear] = useState(2024);

  const formatReports = (reports: any) => {
    const academicYear = `${year}-${year + 1}`;
    return {
      fallCodeData: [
        {
          name: "fall",
          value:
            reports[
              `Total Fall Seats Available for academic year ${academicYear}`
            ],
          color: "#E69F00",
        },
      ],
      springCodeData: [
        {
          name: "spring",
          value:
            reports[
              `Total Spring Seats Available for academic year ${academicYear}`
            ],
          color: "#0072B2",
        },
      ],
      summerCodeData: [
        {
          name: "summer",
          value:
            reports[
              `Total Summer Seats Available for academic year ${academicYear}`
            ],
          color: "#56B4E9",
        },
      ],
      totalSeats:
        reports[`Total Seats Available for academic year ${academicYear}`],
      differenceCards: [
        {
          text: `Difference in ${year} Seats compared to previous year`,
          difference:
            reports[
              `Difference in Seats compared to previous year (${
                year - 1
              }-${year})`
            ],
          percent:
            reports[
              `Percentage change in Seats compared to previous year (${
                year - 1
              }-${year})`
            ],
        },
        {
          text: `Difference in ${year} Enrolled Seats compared to previous year`,
          difference:
            reports[
              `Difference in Enrolled Seats compared to previous year (${
                year - 1
              }-${year})`
            ],
          percent:
            reports[
              `Percentage change in Enrolled Seats compared to previous year (${
                year - 1
              }-${year})`
            ],
        },
        {
          text: `Difference in ${year} Sections compared to previous year`,
          difference:
            reports[
              `Difference in Sections compared to previous year (${
                year - 1
              }-${year})`
            ],
          percent:
            reports[
              `Percentage change in Sections compared to previous year (${
                year - 1
              }-${year})`
            ],
        },
        {
          text: `Difference in ${year} Courses compared to previous year`,
          difference:
            reports[
              `Difference in Courses compared to previous year (${
                year - 1
              }-${year})`
            ],
          percent:
            reports[
              `Percentage change in Courses compared to previous year (${
                year - 1
              }-${year})`
            ],
        },
      ],
    };
  };

  useEffect(() => {
    getReports(year).then((data) => {
      setFormattedReports(formatReports(data));
    });
  }, [year]);

  return (
    <div>
      <h1 className="font-bold text-2xl mb-4"> Graphs for Respective Years</h1>
      <YearSelector setYear={setYear} />

      <div className="flex gap-4 justify-between flex-wrap my-4">
        <TermCard
          year={year}
          term="Fall"
          data={formattedReports.fallCodeData || []}
          totalSeats={formattedReports.totalSeats || 0}
        />
        <TermCard
          year={year}
          term="Spring"
          data={formattedReports.springCodeData || []}
          totalSeats={formattedReports.totalSeats || 0}
        />
        <TermCard
          year={year + 1}
          term="Summer"
          data={formattedReports.summerCodeData || []}
          totalSeats={formattedReports.totalSeats || 0}
        />
      </div>
      <div className="flex gap-4 justify-between flex-wrap my-4">
        {formattedReports.differenceCards?.map((card: any, index: number) => (
          <DifferenceCard
            key={index}
            text={card.text}
            difference={card.difference}
            percent={card.percent}
          />
        ))}
      </div>
    </div>
  );
};

export default GraphsForYear;
