import { useQuery } from "@tanstack/react-query";
import { TERM_STYLES } from "./AnnualReport.helpers";
import { ReportCard } from "./ReportCard";
import { StatItem } from "./StatItem";
import { getCourseReports } from "@/app/api/reports";

const EnrollmentData = ({ year }: { year: number }) => {
  const { data: reports } = useQuery({
    queryKey: ["courseReports", year],
    queryFn: () => getCourseReports(year),
  });

  if (!reports) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-center text-2xl font-semibold">Enrollment Data</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* TOTAL */}
        <ReportCard
          title="Total"
          subtitle={`${year} – ${year + 1} Academic Year`}
          style={TERM_STYLES.TOTAL}
        >
          <StatItem
            label="Total Seats Offered"
            value={reports.total_seats.toLocaleString()}
            highlight
          />
          <StatItem
            label="Total Enrollment"
            value={reports.total_enrollment.toLocaleString()}
            highlight
          />
          <StatItem
            label="Course Sections Offered"
            value={reports.total_sections}
          />
          <StatItem
            label="Seat Occupancy Rate"
            value={`${(
              (reports.total_enrollment / reports.total_seats) *
              100
            ).toFixed(2)}%`}
          />
        </ReportCard>

        {/* SUMMER */}
        <ReportCard
          title="Summer"
          subtitle={`${year}`}
          style={TERM_STYLES.SUMMER}
        >
          <StatItem label="Seats Offered" value={reports.total_summer_seats} />
          <StatItem
            label="Enrollment"
            value={reports.total_summer_enrollment}
          />
          <StatItem
            label="Sections Offered"
            value={reports.total_summer_sections}
          />
          <StatItem
            label="Occupancy Rate"
            value={`${(
              (reports.total_summer_enrollment / reports.total_summer_seats) *
              100
            ).toFixed(2)}%`}
          />
        </ReportCard>

        {/* FALL */}
        <ReportCard title="Fall" subtitle={`${year}`} style={TERM_STYLES.FALL}>
          <StatItem label="Seats Offered" value={reports.total_fall_seats} />
          <StatItem label="Enrollment" value={reports.total_fall_enrollment} />
          <StatItem
            label="Sections Offered"
            value={reports.total_fall_sections}
          />
          <StatItem
            label="Occupancy Rate"
            value={`${(
              (reports.total_fall_enrollment / reports.total_fall_seats) *
              100
            ).toFixed(2)}%`}
          />
        </ReportCard>

        {/* SPRING */}
        <ReportCard
          title="Spring"
          subtitle={`${year + 1}`}
          style={TERM_STYLES.SPRING}
        >
          <StatItem label="Seats Offered" value={reports.total_spring_seats} />
          <StatItem
            label="Enrollment"
            value={reports.total_spring_enrollment}
          />
          <StatItem
            label="Sections Offered"
            value={reports.total_spring_sections}
          />
          <StatItem
            label="Occupancy Rate"
            value={`${(
              (reports.total_spring_enrollment / reports.total_spring_seats) *
              100
            ).toFixed(2)}%`}
          />
        </ReportCard>
      </div>
    </section>
  );
};

export default EnrollmentData;
