"use client";
import dynamic from "next/dynamic";
import TermSelector from "@/app/local-components/TermSelector";
import { useState, useEffect } from "react";
import { getReports } from "@/app/api/reports";
const TermCard = dynamic(() => import("@/app/local-components/TermCard"));
const SeatsGraph = dynamic(() => import("@/app/local-components/SeatsGraph"));
const CoursesAvailable = dynamic(
  () => import("@/app/local-components/CoursesAvailable")
);
const DifferenceCard = dynamic(
  () => import("@/app/local-components/DifferenceCard")
);

const AdminPage = () => {
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
          color: "#ff7f50",
        },
      ],
      springCodeData: [
        {
          name: "spring",
          value:
            reports[
              `Total Spring Seats Available for academic year ${academicYear}`
            ],
          color: "#76c043",
        },
      ],
      summerCodeData: [
        {
          name: "summer",
          value:
            reports[
              `Total Summer Seats Available for academic year ${academicYear}`
            ],
          color: "#ffd700",
        },
      ],
      totalSeats:
        reports[`Total Seats Available for academic year ${academicYear}`],
      differenceCards: [
        {
          text: "Difference in Seats compared to previous year",
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
          text: "Difference in Enrolled Seats compared to previous year",
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
          text: "Difference in Sections compared to previous year",
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
          text: "Difference in Courses compared to previous year",
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
    <main className="m-4">
      <TermSelector setYear={setYear} />
      <div className="flex gap-4 justify-between flex-wrap my-4">
        <TermCard
          term="Fall"
          data={formattedReports.fallCodeData || []}
          totalSeats={formattedReports.totalSeats || 0}
        />
        <TermCard
          term="Spring"
          data={formattedReports.springCodeData || []}
          totalSeats={formattedReports.totalSeats || 0}
        />
        <TermCard
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
      <div className="w-full h-[500px] flex items-center justify-center">
        <SeatsGraph />
        <CoursesAvailable />
      </div>
    </main>
  );
};

export default AdminPage;
