"use client";
import { getCourseCategory } from "@/app/api/reports";
import EnrollmentData from "@/app/local-components/AnnualReportsPage/EnrollmentData";
import GraduateAssistantData from "@/app/local-components/AnnualReportsPage/GraduateAssistantData";
import YearBanner from "@/app/local-components/AnnualReportsPage/YearBanner";
import YearSelector from "@/app/local-components/HomePage/FirstSection/YearSelector";
import { deriveAcademicYears } from "@/lib/helpers";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";

const Page = () => {
  const [year, setYear] = useState<number | null>(null);

  const { data: termCodes, isLoading, isError } = useQuery({
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
    return (
      <div className="flex items-center justify-center">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <div className="p-4 space-y-5">
      <YearSelector filterValues={academicYears} setYear={setYear} />

      <YearBanner year={year} />

      <div className="pt-10 pb-20 space-y-20">
        <EnrollmentData year={year} />

        <GraduateAssistantData year={year} />
      </div>
    </div>
  );
};

export default Page;
