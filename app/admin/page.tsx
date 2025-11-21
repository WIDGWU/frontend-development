"use client";
import GraphsForFiveYear from "../local-components/HomePage/ThirdSection/GraphsForFiveYear";
import GraphsForTerm from "../local-components/HomePage/SecondSection/GraphsForTerm";
import GraphsForYear from "../local-components/HomePage/FirstSection/GraphsForYear";
// import { useState, useEffect } from "react";
import { getCourseCategory } from "@/app/api/reports";
import { useQuery } from "@tanstack/react-query";
import { deriveAcademicYears, getFiveYearRanges } from "@/lib/helpers";

// Home Page for Admin
const AdminPage = () => {
  // const [years, setYears] = useState<string[]>([]);

  const { data: termCodes, isLoading } = useQuery({
    queryKey: ["termCodes"],
    queryFn: () => getCourseCategory(),
  });

  // useEffect(() => {
  //   // Fetch the course categories to get the years

  //   getCourseCategory()
  //     .then((data) => {
  //       setYears(data.Course_Term_Code);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching course categories:", error);
  //     });
  // }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // console.log("Years fetched:", years);

  return (
    <main className="m-4">
      {/* Three graphs are shown, graphs for year, individual term and for five year long period */}
      <GraphsForYear filterValues={deriveAcademicYears(termCodes.Course_Term_Code)} />
      <GraphsForTerm filterValues={termCodes.Course_Term_Code} />
      <GraphsForFiveYear filterValues={getFiveYearRanges(termCodes.Course_Term_Code)} />
    </main>
  );
};

export default AdminPage;
