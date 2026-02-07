"use client";

// import { useState, useEffect } from "react";

// import { getAllCoursesHistory, getCourseByDepartment } from "@/app/api/reports";
// import CourseTable from "@/app/local-components/CoursePage/CourseTable";
// import { CourseType } from "@/app/local-components/CoursePage/CourseTable";
// import { DepartmentFilter } from "@/app/local-components/CoursePage/CourseFilter";
// import { Button } from "@/components/ui/button";

const CourseApproval = () => {
  // const [courseData, setCourseData] = useState<CourseType[]>([]);
  // const [filteredCourseData, setFilteredCourseData] = useState<CourseType[]>(
  //   []
  // );
  // const [department, setDepartment] = useState([]);
  // const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
  //   null
  // );

  // useEffect(() => {
  //   getAllCoursesHistory().then((data) => {
  //     setCourseData(data);
  //     setFilteredCourseData(data);
  //   });
  //   getCourseByDepartment().then((data) => {
  //     setDepartment(data);
  //   });
  // }, []);

  // useEffect(() => {
  //   filterCoursesByDepartment();
  // }, [selectedDepartment]);

  // const filterCoursesByDepartment = () => {
  //   if (selectedDepartment) {
  //     const filteredCourses = courseData.filter((course) =>
  //       course.Course_Number.includes(selectedDepartment)
  //     );
  //     setFilteredCourseData(filteredCourses);
  //   } else {
  //     setFilteredCourseData(courseData);
  //   }
  // };

  // const clearFilter = () => {
  //   setSelectedDepartment(null);
  // };

  return (
    <main className="m-4">
      <div className="flex items-center">
        <h4 className="text-xl font-semibold my-4 mr-4">Course Approval </h4>
        {/* <div className="flex items-center justify-space-between gap-4 mx-4">
          <DepartmentFilter
            department={department}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
          />
        </div>
        <Button onClick={clearFilter}> Clear filter </Button> */}
      </div>
      <p>Coming soon</p>

      {/* <CourseTable courseData={filteredCourseData} /> */}
      {/* <DesignTest /> */}
    </main>
  );
};

export default CourseApproval;
