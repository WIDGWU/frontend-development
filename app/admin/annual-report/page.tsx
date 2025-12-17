"use client";
import { getCourseCategory } from "@/app/api/reports";
import EnrollmentData from "@/app/local-components/AnnualReportsPage/EnrollmentData";
import GraduateAssistantData from "@/app/local-components/AnnualReportsPage/GraduateAssistantData";
import YearBanner from "@/app/local-components/AnnualReportsPage/YearBanner";
import YearSelector from "@/app/local-components/AnnualReportsPage/YearSelector";
import { deriveAcademicYears } from "@/lib/helpers";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const Page = () => {
  const [year, setYear] = useState<number | null>(null);

  const { data: termCodes, isLoading } = useQuery({
    queryKey: ["termCodes"],
    queryFn: getCourseCategory,
  });

  const academicYears = React.useMemo(() => {
    if (!termCodes?.Course_Term_Code) return [];
    return deriveAcademicYears(termCodes.Course_Term_Code);
  }, [termCodes]);

  React.useEffect(() => {
    if (academicYears.length > 0 && year === null) {
      const recentYear = Math.max(...academicYears.map((year) => year.year));
      setYear(recentYear);
    }
  }, [academicYears, year]);

  if (isLoading || year === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 space-y-5">
      <YearSelector filterValues={academicYears} setYear={setYear} />

      <YearBanner year={year} />

      <div className="space-y-10">
        <EnrollmentData year={year} />

        <GraduateAssistantData year={year} />
      </div>
    </div>
  );
};

export default Page;
