"use client";

import { useState, useEffect } from "react";

import { getAllCourses, getCourseByDepartment } from "@/app/api/reports";
import CourseTable from "@/app/local-components/CoursePage/CourseTable";
import CourseFilter from "@/app/local-components/CoursePage/CourseFilter";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [courseData, setCourseData] = useState([]);
  const [department, setDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );

  useEffect(() => {
    getAllCourses().then((data) => {
      setCourseData(data);
    });
    getCourseByDepartment().then((data) => {
      setDepartment(data);
    });
  }, []);

  console.log("Course Data", courseData);
  // console.log("Department Data", department);

  return (
    <main className="m-4">
      <div className="flex items-center">
        <h4 className="text-xl font-semibold my-4 mr-4">Courses </h4>
        <div className="flex items-center justify-space-between gap-4 mx-4">
          <CourseFilter
            department={department}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
          />
        </div>
        <Button> Clear filter </Button>
      </div>

      <CourseTable courseData={courseData} />
    </main>
  );
};

export default Page;
