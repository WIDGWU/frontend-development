"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Person from "@/assets/personIcon.png";
import Book from "@/assets/uploadBook.png";
import UploadIcon from "@/assets/uploadIcon.png";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [gaHovered, setGaHovered] = useState(false);
  const [coursesHovered, setCoursesHovered] = useState(false);
  const router = useRouter();

  const addGA = () => {
    router.push("./upload/add-ga");
  };

  const addCourses = () => {
    router.push("./upload/add-courses");
  };

  return (
    <main className="m-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Upload Graduate Assistant and Courses Data
      </h1>

      <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto">
        {/* Graduate Assistant Upload */}
        <div
          className="flex-1 bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl"
          onMouseEnter={() => setGaHovered(true)}
          onMouseLeave={() => setGaHovered(false)}
        >
          <div className="flex flex-col items-center text-center">
            <div
              className={`w-24 h-24 mb-6 transition-transform duration-300 ${
                gaHovered ? "scale-110" : ""
              }`}
            >
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src={Person}
                  alt="Graduate Assistant"
                  width={96}
                  height={96}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-4">
              Graduate Assistant Data
            </h2>
            <p className="mb-8 text-gray-600">
              To upload Graduate Assistant data, please press the button below.
              The system accepts individual data entry or CSV file uploads.
            </p>

            <Button
              className={`flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-md ${
                gaHovered ? "scale-105" : ""
              }`}
              onClick={() => addGA()}
            >
              <Image
                src={UploadIcon}
                alt="Upload"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              Upload Graduate Assistant Data
            </Button>
          </div>
        </div>

        {/* Courses Upload */}
        <div
          className="flex-1 bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl"
          onMouseEnter={() => setCoursesHovered(true)}
          onMouseLeave={() => setCoursesHovered(false)}
        >
          <div className="flex flex-col items-center text-center">
            <div
              className={`w-24 h-24 mb-6 transition-transform duration-300 ${
                coursesHovered ? "scale-110" : ""
              }`}
            >
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src={Book}
                  alt="Course Data"
                  width={96}
                  height={96}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-4">Course Data</h2>
            <p className="mb-8 text-gray-600">
              To upload Courses data, please press the button below. The system
              accepts individual data entry or CSV file uploads.
            </p>

            <Button
              className={`flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg transition-all duration-300 hover:bg-green-700 hover:shadow-md ${
                coursesHovered ? "scale-105" : ""
              }`}
              onClick={() => {
                addCourses();
              }}
            >
              <Image
                src={UploadIcon}
                alt="Upload"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              Upload Courses Data
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
