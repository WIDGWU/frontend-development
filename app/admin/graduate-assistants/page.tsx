"use client";
import { useState, useEffect } from "react";
import { getGADetails, getGACategoryDetails } from "@/app/api/reports";
import {
  CourseTermFilter,
  GATypeFilter,
  HomeDepartmentFilter,
  HomeSchoolFilter,
} from "@/app/local-components/GAFilter";
import { Button } from "@/components/ui/button";

type GA = {
  COURSE_ID: string;
  CRN: string;
  Course_Term_Code: string;
  GA_First_Name: string;
  GA_Last_Name: string;
  GA_Net_ID: string;
  GA_Type: string;
  Home_Dept: string;
  Home_School: string;
  Hour_Assignment: string;
};

const Page = () => {
  const [ga, setGA] = useState<GA[]>([]);
  const [filteredGA, setFilteredGA] = useState<GA[]>([]);
  const [gaType, setGAType] = useState<string[]>([]);
  const [selectedGAType, setSelectedGAType] = useState<string | null>(null);
  const [homeSchool, setHomeSchool] = useState<string[]>([]);
  const [selectedHomeSchool, setSelectedHomeSchool] = useState<string | null>(
    null
  );
  const [homeDepartment, setHomeDepartment] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [courseTerm, setCourseTerm] = useState<string[]>([]);
  const [selectedCourseTerm, setSelectedCourseTerm] = useState<string | null>(
    null
  );

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  const clearFilters = () => {
    setSelectedGAType(null);
    setSelectedHomeSchool(null);
    setSelectedDepartment(null);
    setSelectedCourseTerm(null);
  };

  useEffect(() => {
    getGACategoryDetails().then((data) => {
      setGAType(data.GA_Type);
      setHomeSchool(data.Home_School);
      setHomeDepartment(data.Home_Dept);
      setCourseTerm(data.Course_Term_Code);
    });
    getGADetails().then((data) => {
      setGA(data);
      setFilteredGA(data); // Initialize filteredGA with all data
    });
  }, []);

  useEffect(() => {
    let filtered = ga;

    if (selectedGAType) {
      filtered = filtered.filter((g) => g.GA_Type === selectedGAType);
    }
    if (selectedHomeSchool) {
      filtered = filtered.filter((g) => g.Home_School === selectedHomeSchool);
    }
    if (selectedDepartment) {
      filtered = filtered.filter((g) => g.Home_Dept === selectedDepartment);
    }
    if (selectedCourseTerm) {
      filtered = filtered.filter(
        (g) => g.Course_Term_Code === selectedCourseTerm
      );
    }

    setFilteredGA(filtered);
  }, [
    selectedGAType,
    selectedHomeSchool,
    selectedDepartment,
    selectedCourseTerm,
    ga,
  ]);

  return (
    <main className="m-4">
      <div className="flex items-center">
        <h4 className="text-xl font-semibold my-4 mr-4">Filter </h4>
        <div className="flex items-center justify-space-between gap-4">
          <GATypeFilter
            gaType={gaType}
            selectedGAType={selectedGAType}
            setSelectedGAType={setSelectedGAType}
          />
          <HomeSchoolFilter
            homeschool={homeSchool}
            selectedHomeSchool={selectedHomeSchool}
            setSelectedHomeSchool={setSelectedHomeSchool}
          />
          <HomeDepartmentFilter
            homeDepartment={homeDepartment}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
          />
          <CourseTermFilter
            courseTerm={courseTerm}
            selectedCourseTerm={selectedCourseTerm}
            setSelectedCourseTerm={setSelectedCourseTerm}
          />
          <Button onClick={clearFilters}> Clear all filters </Button>
        </div>
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

                <span className="text-[14px] px-2 py-1 rounded-full bg-gray-200 mt-2">
                  {g.GA_Net_ID}
                </span>
                <h1 className="text-2xl font-semibold my-4 text-center">
                  {g.GA_First_Name} {g.GA_Last_Name}
                </h1>
                <div>
                  <p className="text-left text-gray-600">
                    <span className="font-bold">GA Type : </span> {g.GA_Type}
                  </p>
                  <p className="text-left text-gray-600">
                    <span className="font-bold">Home Department : </span>
                    {g.Home_Dept}
                  </p>
                  <p className="text-left text-gray-600">
                    <span className="font-bold">Home School : </span>
                    {g.Home_School}
                  </p>
                  <p className="text-left text-gray-600">
                    <span className="font-bold">Assigned Hours : </span>
                    {g.Hour_Assignment} hours
                  </p>
                  <p className="text-left text-gray-600">
                    <span className="font-bold">Course ID : </span>{" "}
                    {g.COURSE_ID}
                  </p>
                  <p className="text-left text-gray-600">
                    <span className="font-bold">CRN : </span> {g.CRN}
                  </p>
                  <p className="text-left text-gray-600">
                    <span className="font-bold">Course Term Code : </span>
                    {g.Course_Term_Code}
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

export default Page;
