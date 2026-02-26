import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

export const CourseTermFilter = ({
  courseTerm,
  selectedCourseTerm,
  setSelectedCourseTerm,
}: {
  courseTerm: string[];
  selectedCourseTerm: string[];
  setSelectedCourseTerm: (value: string[]) => void;
}) => {
  const toggle = (option: string, checked: boolean) => {
    if (checked) setSelectedCourseTerm([...selectedCourseTerm, option]);
    else setSelectedCourseTerm(selectedCourseTerm.filter((x) => x !== option));
  };
  return (
    <div className="flex flex-col gap-2 select-none">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          {selectedCourseTerm.length > 0
            ? `${selectedCourseTerm.length} selected`
            : "Select one or more"}
        </span>
        {selectedCourseTerm.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setSelectedCourseTerm([])}
            title="Clear Course Term filter"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
        {courseTerm?.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox
              id={`course-term-${index}`}
              checked={selectedCourseTerm.includes(option)}
              onCheckedChange={(checked) => toggle(option, checked === true)}
            />
            <Label
              htmlFor={`course-term-${index}`}
              className="text-sm font-normal cursor-pointer"
            >
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CourseCollegeDescriptionFilter = ({
  courseCollegeDescription,
  selectedCourseCollegeDescription,
  setSelectedCourseCollegeDescription,
}: {
  courseCollegeDescription: string[];
  selectedCourseCollegeDescription: string[];
  setSelectedCourseCollegeDescription: (value: string[]) => void;
}) => {
  const toggle = (option: string, checked: boolean) => {
    if (checked)
      setSelectedCourseCollegeDescription([
        ...selectedCourseCollegeDescription,
        option,
      ]);
    else
      setSelectedCourseCollegeDescription(
        selectedCourseCollegeDescription.filter((x) => x !== option)
      );
  };
  return (
    <div className="flex flex-col gap-2 select-none">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          {selectedCourseCollegeDescription.length > 0
            ? `${selectedCourseCollegeDescription.length} selected`
            : "Select one or more"}
        </span>
        {selectedCourseCollegeDescription.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setSelectedCourseCollegeDescription([])}
            title="Clear College filter"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
        {courseCollegeDescription?.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox
              id={`course-college-${index}`}
              checked={selectedCourseCollegeDescription.includes(option)}
              onCheckedChange={(checked) => toggle(option, checked === true)}
            />
            <Label
              htmlFor={`course-college-${index}`}
              className="text-sm font-normal cursor-pointer"
            >
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export const DepartmentFilter = ({
  department,
  selectedDepartment,
  setSelectedDepartment,
}: {
  department: string[];
  selectedDepartment: string[];
  setSelectedDepartment: (value: string[]) => void;
}) => {
  const toggle = (option: string, checked: boolean) => {
    if (checked) setSelectedDepartment([...selectedDepartment, option]);
    else setSelectedDepartment(selectedDepartment.filter((x) => x !== option));
  };
  return (
    <div className="flex flex-col gap-2 select-none">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          {selectedDepartment.length > 0
            ? `${selectedDepartment.length} selected`
            : "Select one or more"}
        </span>
        {selectedDepartment.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setSelectedDepartment([])}
            title="Clear Department filter"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
        {department?.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox
              id={`department-${index}`}
              checked={selectedDepartment.includes(option)}
              onCheckedChange={(checked) => toggle(option, checked === true)}
            />
            <Label
              htmlFor={`department-${index}`}
              className="text-sm font-normal cursor-pointer"
            >
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export const InstructorFilter = ({
  instructor,
  selectedInstructor,
  setSelectedInstructor,
}: {
  instructor: string[];
  selectedInstructor: string[];
  setSelectedInstructor: (value: string[]) => void;
}) => {
  const toggle = (option: string, checked: boolean) => {
    if (checked) setSelectedInstructor([...selectedInstructor, option]);
    else setSelectedInstructor(selectedInstructor.filter((x) => x !== option));
  };
  return (
    <div className="flex flex-col gap-2 select-none">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          {selectedInstructor.length > 0
            ? `${selectedInstructor.length} selected`
            : "Select one or more"}
        </span>
        {selectedInstructor.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setSelectedInstructor([])}
            title="Clear Instructor filter"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
        {instructor?.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox
              id={`instructor-${index}`}
              checked={selectedInstructor.includes(option)}
              onCheckedChange={(checked) => toggle(option, checked === true)}
            />
            <Label
              htmlFor={`instructor-${index}`}
              className="text-sm font-normal cursor-pointer"
            >
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
