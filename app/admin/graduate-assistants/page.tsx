"use client";
import { useState, useEffect } from "react";
import { getGADetails } from "@/app/api/reports";

const Page = () => {
  const [ga, setGA] = useState([]);

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
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Page;
