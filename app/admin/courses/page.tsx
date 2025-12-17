"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCallback, useEffect, useState } from "react";
import { getAllCourses, getCourseCategory } from "@/app/api/reports";
import { Button } from "@/components/ui/button";
import {
  CourseTermFilter,
  CourseCollegeDescriptionFilter,
  DepartmentFilter,
  InstructorFilter,
} from "@/app/local-components/CoursePage/CourseFilter";
import { colleges } from "@/app/helpers/constants";
interface Course {
  COURSE_ID: string;
  Course: string;
  Course_College_Desc: string;
  Course_Term_Code: string;
  Course_Number: string;
  Section_Number: string;
  Section_Credit_Hours: string;
  Instructor_netid: string;
  Instructor_Full_Name: string;
  Course_Status_Desc: string;
  Actual_Enrollment: string;
  CrossList_ID: string;
  Cross_List_Actual: string;
  CRN: string;
  Section_Title: string;
  Schedule_Type_Desc: string;
  Max_Enrollment: string;
  Variable_Credits: string;
  Section_Status_Desc: string;
  Seats_Available: string;
  Cross_List_Max: string;
  Course_Link_Identifier: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [courseTerm, setCourseTerm] = useState<string[]>([]);
  const [selectedCourseTerm, setSelectedCourseTerm] = useState<string | null>(
    null
  );

  // const [courseCollegeDescription, setCourseCollegeDescription] = useState<
  //   string[]
  // >(Object.keys(colleges));
  const [
    selectedCourseCollegeDescription,
    setSelectedCourseCollegeDescription,
  ] = useState<string | null>(null);

  const [courseNumberPrefix, setCourseNumberPrefix] = useState<string[]>([]);
  const [selectedCourseNumberPrefix, setSelectedCourseNumberPrefix] = useState<
    string | null
  >(null);

  const [instructor, setInstructor] = useState<string[]>([]);
  const [selectedInstructor, setSelectedInstructor] = useState<string | null>(
    null
  );

  const clearFilters = useCallback(() => {
    setSelectedCourseTerm(null);
    setSelectedCourseCollegeDescription(null);
    setSelectedCourseNumberPrefix(null);
    setSelectedInstructor(null);
  }, []);

  useEffect(() => {
    getAllCourses().then((data) => {
      setCourses(data);
      setFilteredCourses(data);
      setLoading(false);
    });
    getCourseCategory().then((data) => {
      setCourseTerm(data.Course_Term_Code);
      // setCourseCollegeDescription(data.Course_College_Desc);
      setCourseNumberPrefix(data.Course_Prefix);
      setInstructor(data.Instructor_Full_Name);
    });
  }, []);

  // Filter data based on selected filters
  useEffect(() => {
    setLoading(true);
    let filtered = courses;
    if (selectedCourseTerm) {
      filtered = filtered.filter(
        (c) => c.Course_Term_Code === selectedCourseTerm
      );
    }
    if (selectedCourseCollegeDescription) {
      const validNames = colleges[selectedCourseCollegeDescription];
      filtered = filtered.filter(
        (c) => validNames.aliases.includes(c.Course_College_Desc)
        // (c) => c.Course_College_Desc === selectedCourseCollegeDescription
      );
    }
    if (selectedCourseNumberPrefix) {
      filtered = filtered.filter(
        (c) => c.Course_Number.split(" ")[0] === selectedCourseNumberPrefix
      );
    }
    if (selectedInstructor) {
      filtered = filtered.filter(
        (c) => c.Instructor_Full_Name === selectedInstructor
      );
    }
    setFilteredCourses(filtered);
    setLoading(false);
  }, [
    selectedCourseTerm,
    selectedCourseCollegeDescription,
    selectedCourseNumberPrefix,
    selectedInstructor,
    courses,
  ]);

  return (
    <main className="m-4">
      <div className="flex items-center">
        <h4 className="text-xl font-semibold my-4 mr-4">Courses </h4>
        <div className="flex items-center justify-space-between gap-4 mx-4">
          {/* Content for filtration goes here */}
          <CourseTermFilter
            courseTerm={courseTerm}
            selectedCourseTerm={selectedCourseTerm}
            setSelectedCourseTerm={setSelectedCourseTerm}
          />
          <CourseCollegeDescriptionFilter
            courseCollegeDescription={Object.keys(colleges)}
            selectedCourseCollegeDescription={selectedCourseCollegeDescription}
            setSelectedCourseCollegeDescription={
              setSelectedCourseCollegeDescription
            }
          />
          <DepartmentFilter
            department={courseNumberPrefix}
            selectedDepartment={selectedCourseNumberPrefix}
            setSelectedDepartment={setSelectedCourseNumberPrefix}
          />
          <InstructorFilter
            instructor={instructor}
            selectedInstructor={selectedInstructor}
            setSelectedInstructor={setSelectedInstructor}
          />

          <Button onClick={clearFilters}> Clear all filters</Button>
        </div>
      </div>

      <div className="flex items-center justify-between my-4">
        <h4 className="text-xl font-semibold">
          Total Courses Count: {filteredCourses.length} out of {courses.length}
        </h4>
      </div>

      <div className="grid grid-rows gap-4">
        {loading && <p>Loading...</p>}
        {filteredCourses.map((course, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex flex-row justify-between items-center w-full">
                    <span className="text-[14px] px-2 py-1 rounded-full bg-gray-200 mt-2">
                      {course.COURSE_ID}
                    </span>
                    <h1 className="text-2xl font-semibold text-center">
                      {course.Course_Number}
                    </h1>
                    <h1 className="text-xl text-center">
                      {course.Course_College_Desc}
                    </h1>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <div className="flex flex-row gap-8">
                    <div className="flex-1">
                      <p className="text-left text-gray-600">
                        <span className="font-bold">Course Term Code : </span>{" "}
                        {course.Course_Term_Code
                          ? course.Course_Term_Code
                          : "N/A"}
                      </p>
                      <p className="text-left text-gray-600">
                        <span className="font-bold">Course : </span>
                        {course.Course ? course.Course : "N/A"}
                      </p>
                      <p className="text-left text-gray-600">
                        <span className="font-bold">Section Number : </span>
                        {course.Section_Number ? course.Section_Number : "N/A"}
                      </p>

                      <p className="text-left text-gray-600">
                        <span className="font-bold">
                          Section Credit Hours :{" "}
                        </span>
                        {course.Section_Credit_Hours
                          ? course.Section_Credit_Hours
                          : "0"}
                      </p>
                      <p className="text-left text-gray-600">
                        <span className="font-bold">Instructor: </span>
                        {course.Instructor_Full_Name
                          ? course.Instructor_Full_Name +
                            " (" +
                            course.Instructor_netid +
                            ")"
                          : "N/A"}
                      </p>
                      <p className="text-left text-gray-600">
                        <span className="font-bold">
                          Course Status Description:
                        </span>
                        {course.Course_Status_Desc
                          ? course.Course_Status_Desc
                          : "N/A"}
                      </p>
                      <p className="text-left text-gray-600">
                        <span className="font-bold">Actual Enrollment: </span>{" "}
                        {course.Actual_Enrollment
                          ? course.Actual_Enrollment
                          : 0}
                      </p>

                      <p className="text-left text-gray-600">
                        <span className="font-bold">CrossList ID: </span>{" "}
                        {course.CrossList_ID ? course.CrossList_ID : "N/A"}
                      </p>
                      <p className="text-left text-gray-600">
                        <span className="font-bold">CrossList Actual: </span>{" "}
                        {course.Cross_List_Actual
                          ? course.Cross_List_Actual
                          : 0}
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="text-left text-gray-600">
                        <span className="font-bold">CRN : </span>
                        {course.CRN ? course.CRN : "N/A"}
                      </p>
                      <p className="text-left text-gray-600">
                        <span className="font-bold">Section Title: </span>
                        {course.Section_Title ? course.Section_Title : "N/A"}
                      </p>
                      <p className="text-left text-gray-600">
                        <span className="font-bold">
                          Schedule Type Description:{" "}
                        </span>
                        {course.Schedule_Type_Desc
                          ? course.Schedule_Type_Desc
                          : "N/A"}
                      </p>
                      <p className="text-left text-gray-600">
                        <span className="font-bold">Maximum Enrollment: </span>
                        {course.Max_Enrollment ? course.Max_Enrollment : 0}
                      </p>
                      <p className="text-left text-gray-600">
                        <span className="font-bold">Variable Credits: </span>
                        {course.Variable_Credits ? course.Variable_Credits : 0}
                      </p>
                      <p className="text-left text-gray-600">
                        <span className="font-bold">
                          Section Status Description:
                        </span>
                        {course.Section_Status_Desc
                          ? course.Section_Status_Desc
                          : "N/A"}
                      </p>

                      <p className="text-left text-gray-600">
                        <span className="font-bold">Seats Available: </span>
                        {course.Seats_Available ? course.Seats_Available : 0}
                      </p>
                      <p className="text-left text-gray-600">
                        <span className="font-bold">Cross List Maximum: </span>
                        {course.Cross_List_Max ? course.Cross_List_Max : 0}
                      </p>
                      <p className="text-left text-gray-600">
                        <span className="font-bold">
                          Course Link Identifier:
                        </span>
                        {course.Course_Link_Identifier
                          ? course.Course_Link_Identifier
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Courses;
