import { getGAReport } from "@/app/api/reports";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { StatItem } from "./StatItem";
import { ReportCard } from "./ReportCard";
import { TERM_STYLES } from "./AnnualReport.helpers";

interface GraduateAssistantDataProps {
  year: number;
}

const GraduateAssistantData = ({ year }: GraduateAssistantDataProps) => {
  const type = "SALARY";

  const { data: reports, isLoading } = useQuery({
    queryKey: ["gaCount", year, type],
    queryFn: () => getGAReport(year, type),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-center text-2xl font-semibold">GA Data</h1>

      {/* <div className="grid grid-cols-2 gap-5">
        <div className="border border-blue-900 rounded-lg">
          <h2 className="rounded-t p-2 bg-blue-900 text-white">Total</h2>
          <div className="grid grid-cols-3 gap-6 p-4 bg-blue-900/5">
            <StatItem
              label="Individual WID GAs"
              value={reports.total_ga_count}
              highlight
            />
            <StatItem
              label="Students Served"
              value={reports.total_students_served}
            />
            <StatItem
              label="Salary-only Positions"
              value={reports.total_ga_count_by_type}
            />
          </div>
        </div>

        <div className="border border-blue-900 rounded-lg">
          <h2 className="rounded-t p-2 bg-blue-900 text-white">Summer</h2>
          <div className="grid grid-cols-2 gap-10 p-4 bg-blue-900/5">
            <div>
              <p>Individual WID GAs</p>
              <p className="font-semibold text-3xl">
                {reports.total_ga_count.toLocaleString()}
              </p>
            </div>
            <div>
              <p>Course Sections served by GAs</p>
              <p className="font-semibold text-3xl">%</p>
            </div>
            <div>
              <p>Students Served</p>
              <p className="font-semibold text-3xl">
                {reports.total_ga_count_by_type.toLocaleString()}
              </p>
            </div>
            <div>
              <p>Salary-Only WID GAs Positions</p>
              <p className="font-semibold text-3xl">
                {reports.total_students_served.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="border border-blue-900 rounded-lg">
          <h2 className="rounded-t p-2 bg-blue-900 text-white">Fall</h2>
          <div className="grid grid-cols-2 gap-10 p-4 bg-blue-900/5">
            <div>
              <p>Individual WID GAs</p>
              <p className="font-semibold text-3xl">
                {reports.total_ga_count.toLocaleString()}
              </p>
            </div>
            <div>
              <p>Course Sections served by GAs</p>
              <p className="font-semibold text-3xl">%</p>
            </div>
            <div>
              <p>Students Served</p>
              <p className="font-semibold text-3xl">
                {reports.total_ga_count_by_type.toLocaleString()}
              </p>
            </div>
            <div>
              <p>Salary-Only WID GAs Positions</p>
              <p className="font-semibold text-3xl">
                {reports.total_students_served.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="border border-blue-900 rounded-lg">
          <h2 className="rounded-t p-2 bg-blue-900 text-white">Spring</h2>
          <div className="grid grid-cols-2 gap-10 p-4 bg-blue-900/5">
            <div>
              <p>Individual WID GAs</p>
              <p className="font-semibold text-3xl">
                {reports.total_ga_count.toLocaleString()}
              </p>
            </div>
            <div>
              <p>Course Sections served by GAs</p>
              <p className="font-semibold text-3xl">%</p>
            </div>
            <div>
              <p>Students Served</p>
              <p className="font-semibold text-3xl">
                {reports.total_ga_count_by_type.toLocaleString()}
              </p>
            </div>
            <div>
              <p>Salary-Only WID GAs Positions</p>
              <p className="font-semibold text-3xl">
                {reports.total_students_served.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div> */}

      <div className="grid md:grid-cols-2 gap-6">
        {/* TOTAL */}
        <ReportCard
          title="Total"
          subtitle={`${year} – ${year + 1} Academic Year`}
          style={TERM_STYLES.TOTAL}
        >
          <StatItem
            label="Individual WID GAs"
            value={reports.total_ga_count.toLocaleString()}
            highlight
          />
          <StatItem
            label="Salary-Only WID GAs Positions"
            value={reports.total_ga_count_by_type.toLocaleString()}
            highlight
          />
          <StatItem
            label="Students Served"
            value={reports.total_students_served}
          />
          <StatItem label="Course Sections Served by GAs" value={reports.total_sections_count} />
        </ReportCard>

        {/* SUMMER */}
        <ReportCard
          title="Summer"
          subtitle={`${year}`}
          style={TERM_STYLES.SUMMER}
        >
          <StatItem
            label="Individual WID GAs"
            value={reports.summer_ga_count.toLocaleString()}
          />
          <StatItem
            label="Salary-Only WID GAs Positions"
            value={reports.summer_ga_count_by_type.toLocaleString()}
          />
          <StatItem
            label="Students Served"
            value={reports.summer_students_served}
          />
          <StatItem label="Course Sections Served by GAs" value={reports.summer_sections_count} />
        </ReportCard>

        {/* FALL */}
        <ReportCard title="Fall" subtitle={`${year}`} style={TERM_STYLES.FALL}>
          <StatItem
            label="Individual WID GAs"
            value={reports.fall_ga_count.toLocaleString()}
          />
          <StatItem
            label="Salary-Only WID GAs Positions"
            value={reports.fall_ga_count_by_type.toLocaleString()}
          />
          <StatItem
            label="Students Served"
            value={reports.fall_students_served}
          />
          <StatItem label="Course Sections Served by GAs" value={reports.fall_sections_count} />
        </ReportCard>

        {/* SPRING */}
        <ReportCard
          title="Spring"
          subtitle={`${year + 1}`}
          style={TERM_STYLES.SPRING}
        >
          <StatItem
            label="Individual WID GAs"
            value={reports.spring_ga_count.toLocaleString()}
          />
          <StatItem
            label="Salary-Only WID GAs Positions"
            value={reports.spring_ga_count_by_type.toLocaleString()}
          />
          <StatItem
            label="Students Served"
            value={reports.spring_students_served}
          />
          <StatItem label="Course Sections Served by GAs" value={reports.spring_sections_count} />
        </ReportCard>
      </div>
    </div>
  );
};

export default GraduateAssistantData;
