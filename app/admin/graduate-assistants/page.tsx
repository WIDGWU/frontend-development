"use client";
import { useState, useEffect } from "react";
import { getGADetails } from "@/app/api/reports";

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

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  useEffect(() => {
    getGADetails().then((data) => {
      setGA(data);
    });
  }, []);

  return (
    <main className="m-4">
      <h1 className="text-3xl font-semibold my-4">Graduate Assistants</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {ga.map((g, i) => (
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
                  <span className="font-bold">Course ID : </span> {g.COURSE_ID}
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
    </main>
  );
};

export default Page;
