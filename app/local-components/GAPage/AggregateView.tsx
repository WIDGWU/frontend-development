import { useState, useEffect } from "react";
import {
  getCollectiveGADetails,
  getGACategoryDetails,
} from "@/app/api/reports";
import {
  CourseTermFilter,
  GATypeFilter,
} from "@/app/local-components/GAPage/GAFilter";
import { Button } from "@/components/ui/button";

type GA = {
  GA_Net_ID: string;
  GA_Type: string;
  Home_School: string;
  GA_First_Name: string;
  GA_Last_Name: string;
  Courses: string;
  Term_Codes: string;
  Total_Actual_Enrollment: number;
  Total_Max_Enrollment: number;
};

const AggregateView = () => {
  const [ga, setGA] = useState<GA[]>([]);
  const [filteredGA, setFilteredGA] = useState<GA[]>([]);
  const [totalGACount, setTotalGACount] = useState<number>(0);
  const [gaType, setGAType] = useState<string[]>([]);
  const [selectedGAType, setSelectedGAType] = useState<string | null>(null);
  const [courseTerm, setCourseTerm] = useState<string[]>([]);
  const [selectedCourseTerm, setSelectedCourseTerm] = useState<string | null>(
    null
  );

  // Function to get initials of first name and last name
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  // Function to clear all filters
  const clearFilters = () => {
    setSelectedGAType(null);
    setSelectedCourseTerm(null);
  };

  // Fetch data from API
  useEffect(() => {
    getGACategoryDetails().then((data) => {
      setGAType(data.GA_Type);
      setCourseTerm(data.Course_Term_Code);
    });
    getCollectiveGADetails().then((data) => {
      setGA(data);
      setFilteredGA(data); // Initialize filteredGA with all data
      setTotalGACount(data.length);
    });
  }, []);

  useEffect(() => {
    let filtered = ga;

    if (selectedGAType) {
      filtered = filtered.filter((g) => g.GA_Type === selectedGAType);
    }

    if (selectedCourseTerm) {
      filtered = filtered.filter((g) =>
        g.Term_Codes.split(",").includes(selectedCourseTerm)
      );
    }

    setFilteredGA(filtered);
  }, [selectedGAType, selectedCourseTerm, ga]);
  return (
    <main className="m-4">
      <div className="flex items-center">
        <h4 className="text-xl font-semibold my-4 mr-4">Filter </h4>
      </div>
      <div className="flex items-center justify-space-between gap-4">
        <GATypeFilter
          gaType={gaType}
          selectedGAType={selectedGAType}
          setSelectedGAType={setSelectedGAType}
        />
        <CourseTermFilter
          courseTerm={courseTerm}
          selectedCourseTerm={selectedCourseTerm}
          setSelectedCourseTerm={setSelectedCourseTerm}
        />
        <Button onClick={clearFilters}>Clear Filters</Button>
      </div>

      <div className="flex items-center justify-between my-4">
        <h4 className="text-xl font-semibold">
          Total GA Count: {filteredGA.length} out of {totalGACount}
        </h4>
      </div>

      {filteredGA.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredGA.map((g, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-white">
                  {getInitials(g.GA_First_Name, g.GA_Last_Name)}
                </div>

                <h1 className="text-2xl font-semibold my-4 text-center">
                  {g.GA_First_Name} {g.GA_Last_Name}
                </h1>
                <div>
                  <p className="text-left text-gray-600">
                    <span className="font-bold">GA Type : </span> {g.GA_Type}
                  </p>

                  <p className="text-left text-gray-600">
                    <span className="font-bold">GA Net ID: </span>
                    {g.GA_Net_ID}
                  </p>
                  <p className="text-left text-gray-600">
                    <span className="font-bold">Home School: </span>
                    {g.Home_School}
                  </p>
                  <p className="text-left text-gray-600">
                    <span className="font-bold">Total Actual Enrollment: </span>
                    {g.Total_Actual_Enrollment}
                  </p>
                  <p className="text-left text-gray-600">
                    <span className="font-bold">Total Maximum Enrollment:</span>
                    {g.Total_Max_Enrollment}
                  </p>
                  <p className="text-left text-gray-600">
                    <span className="font-bold">Courses : </span>
                    <span className="flex flex-col space-y-2 mt-2">
                      {g.Courses &&
                        g.Courses.split(",").map((course, index) => (
                          <span
                            key={index}
                            className="bg-gray-200 px-2 py-1 rounded-full text-sm mr-2 text-center"
                          >
                            {course}
                          </span>
                        ))}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center text-4xl h-96">
          Sorry, No matching results were found.
        </div>
      )}
    </main>
  );
};

export default AggregateView;
