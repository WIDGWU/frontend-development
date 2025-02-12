"use client";

import { useState, useEffect } from "react";

import { getAllCourses, getCourseByDepartment } from "@/app/api/reports";
import CourseTable from "@/app/local-components/CoursePage/CourseTable";
import { CourseType } from "@/app/local-components/CoursePage/CourseTable";
import CourseFilter from "@/app/local-components/CoursePage/CourseFilter";
import { Button } from "@/components/ui/button";
// import DesignTest from "@/app/local-components/CoursePage/DesignTest";

const Page = () => {
  const [courseData, setCourseData] = useState<CourseType[]>([]);
  const [filteredCourseData, setFilteredCourseData] = useState<CourseType[]>(
    []
  );
  const [department, setDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );

  useEffect(() => {
    getAllCourses().then((data) => {
      setCourseData(data);
      setFilteredCourseData(data);
    });
    getCourseByDepartment().then((data) => {
      setDepartment(data);
    });
  }, []);

  useEffect(() => {
    filterCoursesByDepartment();
  }, [selectedDepartment]);

  const filterCoursesByDepartment = () => {
    if (selectedDepartment) {
      const filteredCourses = courseData.filter((course) =>
        course.Course_Number.includes(selectedDepartment)
      );
      setFilteredCourseData(filteredCourses);
    } else {
      setFilteredCourseData(courseData);
    }
  };

  const clearFilter = () => {
    setSelectedDepartment(null);
  };
  // console.log("Course Data", courseData);
  // console.log("Department Data", department);
  console.log("Selected courses", courseData);
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
        <Button onClick={clearFilter}> Clear filter </Button>
      </div>

      <CourseTable courseData={filteredCourseData} />
      {/* <DesignTest /> */}
    </main>
  );
};

export default Page;
