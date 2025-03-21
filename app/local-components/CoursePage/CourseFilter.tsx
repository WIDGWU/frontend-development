import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CourseTermFilter = ({
  courseTerm,
  selectedCourseTerm,
  setSelectedCourseTerm,
}: {
  courseTerm: string[];
  selectedCourseTerm: string | null;
  setSelectedCourseTerm: (value: string | null) => void;
}) => {
  return (
    <div className="flex items-center select-none">
      <Select onValueChange={(value) => setSelectedCourseTerm(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a course term">
            {selectedCourseTerm || "Select a course term"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {courseTerm?.map((term, index) => (
            <SelectItem key={index} value={term}>
              {term}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export const CourseCollegeDescriptionFilter = ({
  courseCollegeDescription,
  selectedCourseCollegeDescription,
  setSelectedCourseCollegeDescription,
}: {
  courseCollegeDescription: string[];
  selectedCourseCollegeDescription: string | null;
  setSelectedCourseCollegeDescription: (value: string | null) => void;
}) => {
  return (
    <div className="flex items-center select-none">
      <Select
        onValueChange={(value) => setSelectedCourseCollegeDescription(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a college">
            {selectedCourseCollegeDescription || "Select a college"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {courseCollegeDescription?.map((college, index) => (
            <SelectItem key={index} value={college}>
              {college}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export const CourseNumberPrefixFilter = ({
  courseNumberPrefix,
  selectedCourseNumberPrefix,
  setSelectedCourseNumberPrefix,
}: {
  courseNumberPrefix: string[];
  selectedCourseNumberPrefix: string | null;
  setSelectedCourseNumberPrefix: (value: string | null) => void;
}) => {
  return (
    <div className="flex items-center select-none">
      <Select onValueChange={(value) => setSelectedCourseNumberPrefix(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a department">
            {selectedCourseNumberPrefix || "Select a department"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {courseNumberPrefix?.map((cn, index) => (
            <SelectItem key={index} value={cn}>
              {cn}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export const InstructorFilter = ({
  instructor,
  selectedInstructor,
  setSelectedInstructor,
}: {
  instructor: string[];
  selectedInstructor: string | null;
  setSelectedInstructor: (value: string | null) => void;
}) => {
  return (
    <div className="flex items-center select-none">
      <Select onValueChange={(value) => setSelectedInstructor(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Instructor">
            {selectedInstructor || "Select a Instructor"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {instructor?.map((instructor, index) => (
            <SelectItem key={index} value={instructor}>
              {instructor}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
