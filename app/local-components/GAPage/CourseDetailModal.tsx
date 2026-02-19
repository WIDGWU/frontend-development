"use client";

import { useQuery } from "@tanstack/react-query";
import { getCourseById } from "@/app/api/reports";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader } from "@/app/local-components/Loader";

export interface Course {
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

type CourseDetailModalProps = {
  courseId: string | null;
  onClose: () => void;
};

export const CourseDetailModal = ({
  courseId,
  onClose,
}: CourseDetailModalProps) => {
  const {
    data: course,
    isLoading,
    isError,
  } = useQuery<Course>({
    queryKey: ["courseById", courseId],
    queryFn: () => getCourseById(courseId!),
    enabled: !!courseId,
  });

  const open = courseId !== null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Course details</DialogTitle>
        </DialogHeader>
        {isLoading && (
          <div className="py-8">
            <Loader />
          </div>
        )}
        {isError && (
          <div className="py-4">
            <p className="text-red-600">Failed to load course details.</p>
          </div>
        )}
        {course && !isLoading && (
          <>
            <div className="flex flex-row justify-between items-center gap-4 pb-4 border-b border-gray-200">
              <span className="text-sm px-2 py-1 rounded-full bg-gray-200 font-medium">
                {course.COURSE_ID}
              </span>
              <h2 className="text-xl font-semibold">{course.Course_Number}</h2>
              <span className="text-gray-600">{course.Course_College_Desc}</span>
            </div>
            <div className="flex flex-row gap-8 pt-4">
            <div className="flex-1">
              <p className="text-left text-gray-600">
                <span className="font-bold">Course Term Code : </span>{" "}
                {course.Course_Term_Code ? course.Course_Term_Code : "N/A"}
              </p>
              <p className="text-left text-gray-600">
                <span className="font-bold">Course : </span>
                {course.Course ?? "N/A"}
              </p>
              <p className="text-left text-gray-600">
                <span className="font-bold">Section Number : </span>
                {course.Section_Number ?? "N/A"}
              </p>
              <p className="text-left text-gray-600">
                <span className="font-bold">Section Credit Hours : </span>
                {course.Section_Credit_Hours ? course.Section_Credit_Hours : "0"}
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
                <span className="font-bold">Course Status Description: </span>
                {course.Course_Status_Desc ?? "N/A"}
              </p>
              <p className="text-left text-gray-600">
                <span className="font-bold">Actual Enrollment: </span>{" "}
                {course.Actual_Enrollment ?? 0}
              </p>
              <p className="text-left text-gray-600">
                <span className="font-bold">CrossList ID: </span>{" "}
                {course.CrossList_ID ?? "N/A"}
              </p>
              <p className="text-left text-gray-600">
                <span className="font-bold">CrossList Actual: </span>{" "}
                {course.Cross_List_Actual ?? 0}
              </p>
            </div>
            <div className="flex-1">
              <p className="text-left text-gray-600">
                <span className="font-bold">CRN : </span>
                {course.CRN ?? "N/A"}
              </p>
              <p className="text-left text-gray-600">
                <span className="font-bold">Section Title: </span>
                {course.Section_Title ?? "N/A"}
              </p>
              <p className="text-left text-gray-600">
                <span className="font-bold">Schedule Type Description: </span>
                {course.Schedule_Type_Desc ?? "N/A"}
              </p>
              <p className="text-left text-gray-600">
                <span className="font-bold">Maximum Enrollment: </span>
                {course.Max_Enrollment ?? 0}
              </p>
              <p className="text-left text-gray-600">
                <span className="font-bold">Variable Credits: </span>
                {course.Variable_Credits ?? 0}
              </p>
              <p className="text-left text-gray-600">
                <span className="font-bold">Section Status Description: </span>
                {course.Section_Status_Desc ? course.Section_Status_Desc : "N/A"}
              </p>
              <p className="text-left text-gray-600">
                <span className="font-bold">Seats Available: </span>
                {course.Seats_Available ? course.Seats_Available : 0}
              </p>
              <p className="text-left text-gray-600">
                <span className="font-bold">Cross List Maximum: </span>
                {course.Cross_List_Max ?? 0}
              </p>
              <p className="text-left text-gray-600">
                <span className="font-bold">Course Link Identifier: </span>
                {course.Course_Link_Identifier ?? "N/A"}
              </p>
            </div>
          </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
