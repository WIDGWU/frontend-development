"use client";
import GraphsForFiveYear from "../local-components/HomePage/ThirdSection/GraphsForFiveYear";
import GraphsForTerm from "../local-components/HomePage/SecondSection/GraphsForTerm";
import GraphsForYear from "../local-components/HomePage/FirstSection/GraphsForYear";
import { getCourseCategory } from "@/app/api/reports";
import { useQuery } from "@tanstack/react-query";
import { deriveAcademicYears, getFiveYearRanges } from "@/lib/helpers";

// Home Page for Admin
const AdminPage = () => {

  const { data: termCodes, isLoading } = useQuery({
    queryKey: ["termCodes"],
    queryFn: () => getCourseCategory(),
  });

  // const handleDelete = async (termCode: string) => {
  //   try {
  //     // Call the API to delete records by term code
  //     const response = await deleteRecordsByTermCode(termCode);
  //     console.log("Delete response:", response);
  //     // Optionally, you can refetch data or update the UI accordingly
  //   } catch (error) {
  //     console.error("Error deleting records:", error);
  //   }
  // }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="m-4">
      {/* Three graphs are shown, graphs for year, individual term and for five year long period */}
      {/* <button onClick={() => handleDelete('202402')}>Delete</button> */}
      <GraphsForYear filterValues={deriveAcademicYears(termCodes.Course_Term_Code)} />
      <GraphsForTerm filterValues={termCodes.Course_Term_Code} />
      <GraphsForFiveYear filterValues={getFiveYearRanges(termCodes.Course_Term_Code)} />
    </main>
  );
};

export default AdminPage;
