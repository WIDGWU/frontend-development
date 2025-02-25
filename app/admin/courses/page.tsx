"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { getAllCourses } from "@/app/api/reports";

interface Course {
  COURSE_ID: string;
  Course: string;
  Course_College_Desc: string;
  Course_Term_Code: string;
  Course_Number: string;
  Section_Number: string;
  Section_Credit_Hours: string;
  Instructor_netid: string;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCourses().then((data) => {
      setCourses(data);
      setLoading(false);
    });
  }, []);

  return (
    <main className="m-4">
      <div className="flex items-center">
        <h4 className="text-xl font-semibold my-4 mr-4">Courses </h4>
        <div className="flex items-center justify-space-between gap-4 mx-4">
          {/* Content for filtration goes here */}
        </div>
      </div>
      <div className="grid grid-rows gap-4">
        {loading && <p>Loading...</p>}
        {courses.map((course, i) => (
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
                      {course.Course}
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
                        {course.Course_Term_Code}
                      </p>
                      <p className="text-left text-gray-600">
                        <span className="font-bold">Course Number : </span>
                        {course.Course_Number}
                      </p>
                      <p className="text-left text-gray-600">
                        <span className="font-bold">Section Number : </span>
                        {course.Section_Number}
                      </p>

                      <p className="text-left text-gray-600">
                        <span className="font-bold">
                          Section Credit Hours :{" "}
                        </span>
                        {course.Section_Credit_Hours}
                      </p>
                      <p className="text-left text-gray-600">
                        <span className="font-bold">Instructor NetID : </span>
                        {course.Instructor_netid}
                      </p>
                      <p className="text-left text-gray-600">
                        <span className="font-bold">
                          Course Status Description:{" "}
                        </span>{" "}
                        {course.Course_Status_Desc}
                      </p>
                      <p className="text-left text-gray-600">
                        <span className="font-bold">Actual Enrollment: </span>{" "}
                        {course.Actual_Enrollment}
                      </p>

                      <p className="text-left text-gray-600">
                        <span className="font-bold">CrossList ID: </span>{" "}
                        {course.CrossList_ID}
                      </p>
                      <p className="text-left text-gray-600">
                        <span className="font-bold">CrossList Actual: </span>{" "}
                        {course.Cross_List_Actual}
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="text-left text-gray-600">
                        <span className="font-bold">CRN : </span>
                        {course.CRN}
                      </p>
                      <p className="text-left text-gray-600">
                        <span className="font-bold">Section Title: </span>
                        {course.Section_Title}
                      </p>
                      <p className="text-left text-gray-600">
                        <span className="font-bold">
                          Schedule Type Description:{" "}
                        </span>
                        {course.Schedule_Type_Desc}
                      </p>
                      <p className="text-left text-gray-600">
                        <span className="font-bold">Maximum Enrollment: </span>
                        {course.Max_Enrollment}
                      </p>
                      <p className="text-left text-gray-600">
                        <span className="font-bold">Variable Credits: </span>
                        {course.Variable_Credits}
                      </p>
                      <p className="text-left text-gray-600">
                        <span className="font-bold">
                          Section Status Description:{" "}
                        </span>{" "}
                        {course.Section_Status_Desc}
                      </p>

                      <p className="text-left text-gray-600">
                        <span className="font-bold">Seats Available: </span>
                        {course.Seats_Available}
                      </p>
                      <p className="text-left text-gray-600">
                        <span className="font-bold">Cross List Maximum: </span>
                        {course.Cross_List_Max}
                      </p>
                      <p className="text-left text-gray-600">
                        <span className="font-bold">
                          Course Link Identifier:{" "}
                        </span>{" "}
                        {course.Course_Link_Identifier}
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
