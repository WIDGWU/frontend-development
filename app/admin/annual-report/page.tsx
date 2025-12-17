"use client";
import { getCourseCategory } from "@/app/api/reports";
import EnrollmentData from "@/app/local-components/AnnualReportsPage/EnrollmentData";
import YearSelector from "@/app/local-components/HomePage/FirstSection/YearSelector";
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
    <div className="">
      {/* <YearSelector
        filterValues={deriveAcademicYears(termCodes.Course_Term_Code)}
        setYear={setYear}
      /> */}
      <div className="p-4">
        <YearSelector filterValues={academicYears} setYear={setYear} />
      </div>

      <div className="p-10 bg-blue-300 text-center text-xl">
        <p>
          Annual Report for <br />{" "}
          <span className="font-bold text-4xl">
            {year} - {year + 1} AY
          </span>
        </p>
      </div>

      <div className="p-4">
        <EnrollmentData year={year} />

        <div className="space-y-4">
          <h1>GA Data</h1>
          <div>
            <h2>Total</h2>
            <div>
              <p>Number of individual WID GAs</p>
              <p></p>
            </div>
            <div>
              <p>Number of course sections served by GAs</p>
              <p></p>
            </div>
            <div>
              <p>Number of students served</p>
              <p></p>
            </div>
            <div>
              <p>Salary-Only WID GAs POSITIONS</p>
              <p></p>
            </div>
          </div>

          <div>
            <h2>Summer {year}</h2>
            <div>
              <p>Number of individual WID GAs</p>
              <p></p>
            </div>
            <div>
              <p>Number of course sections served by GAs</p>
              <p></p>
            </div>
            <div>
              <p>Number of students served</p>
              <p></p>
            </div>
            <div>
              <p>Salary-Only WID GAs POSITIONS</p>
              <p></p>
            </div>
          </div>

          <div>
            <h2>Fall {year}</h2>
            <div>
              <p>Number of individual WID GAs</p>
              <p></p>
            </div>
            <div>
              <p>Number of course sections served by GAs</p>
              <p></p>
            </div>
            <div>
              <p>Number of students served</p>
              <p></p>
            </div>
            <div>
              <p>Salary-Only WID GAs POSITIONS</p>
              <p></p>
            </div>
          </div>

          <div>
            <h2>Spring {year + 1}</h2>
            <div>
              <p>Number of individual WID GAs</p>
              <p></p>
            </div>
            <div>
              <p>Number of course sections served by GAs</p>
              <p></p>
            </div>
            <div>
              <p>Number of students served</p>
              <p></p>
            </div>
            <div>
              <p>Salary-Only WID GAs POSITIONS</p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
