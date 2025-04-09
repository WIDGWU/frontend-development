"use client";
import DepartmentCourseCountChat from "@/app/local-components/Departments/DepartmentCourseCountChart";
import { useState, useEffect } from "react";
import { getDepartmentInfo } from "@/app/api/reports";

const Page = () => {
  const [departmentsCourseCount, setDepartmentsCourseCount] = useState([]);

  useEffect(() => {
    getDepartmentInfo().then((data) => {
      setDepartmentsCourseCount(data["Department_Courses_Count"]);
    });
  }, []);

  return (
    <main className="m-4">
      <h1 className="text-2xl font-bold mb-4">Departments</h1>
      <DepartmentCourseCountChat
        departmentsCourseCount={departmentsCourseCount}
      />
    </main>
  );
};

export default Page;
