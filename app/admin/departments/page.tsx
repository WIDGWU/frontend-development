"use client";
import DepartmentCourseCountChat from "@/app/local-components/Departments/DepartmentCourseCountChart";
import { useState, useEffect } from "react";
import { getDepartmentInfo } from "@/app/api/reports";
import DepartmentAggregate from "@/app/local-components/Departments/DepartmentAggregate";

const Page = () => {
  const [departments, setDepartments] = useState([]);
  const [departmentsCourseCount, setDepartmentsCourseCount] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    getDepartmentInfo().then((data) => {
      setDepartmentsCourseCount(data["Department_Courses_Count"]);
      setDepartments(data["Department"]);
    });
  }, []);


  return (
    <main className="m-4">
      <h1 className="text-2xl font-bold mb-4">Departments</h1>
      <DepartmentCourseCountChat
        departmentsCourseCount={departmentsCourseCount}
      />
      <DepartmentAggregate
        department={departments}
        selectedDepartment={selectedDepartment}
        setDepartment={setSelectedDepartment}
      />
    </main>
  );
};

export default Page;
