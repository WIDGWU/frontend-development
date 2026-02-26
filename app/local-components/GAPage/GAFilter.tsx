import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

// Filter based on GA Type
export const GATypeFilter = ({
  gaType,
  selectedGAType,
  setSelectedGAType,
}: {
  gaType: string[];
  selectedGAType: string[];
  setSelectedGAType: (value: string[]) => void;
}) => {
  const toggle = (option: string, checked: boolean) => {
    if (checked) setSelectedGAType([...selectedGAType, option]);
    else setSelectedGAType(selectedGAType.filter((x) => x !== option));
  };
  return (
    <div className="flex flex-col gap-2 select-none">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          {selectedGAType.length > 0
            ? `${selectedGAType.length} selected`
            : "Select one or more"}
        </span>
        {selectedGAType.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setSelectedGAType([])}
            title="Clear GA Type filter"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
        {gaType?.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox
              id={`ga-type-${index}`}
              checked={selectedGAType.includes(option)}
              onCheckedChange={(checked) => toggle(option, checked === true)}
            />
            <Label
              htmlFor={`ga-type-${index}`}
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

// Filter based on Home School
export const HomeSchoolFilter = ({
  homeschool,
  selectedHomeSchool,
  setSelectedHomeSchool,
}: {
  homeschool: string[];
  selectedHomeSchool: string[];
  setSelectedHomeSchool: (value: string[]) => void;
}) => {
  const toggle = (option: string, checked: boolean) => {
    if (checked) setSelectedHomeSchool([...selectedHomeSchool, option]);
    else setSelectedHomeSchool(selectedHomeSchool.filter((x) => x !== option));
  };
  return (
    <div className="flex flex-col gap-2 select-none">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          {selectedHomeSchool.length > 0
            ? `${selectedHomeSchool.length} selected`
            : "Select one or more"}
        </span>
        {selectedHomeSchool.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setSelectedHomeSchool([])}
            title="Clear Home School filter"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
        {homeschool?.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox
              id={`home-school-${index}`}
              checked={selectedHomeSchool.includes(option)}
              onCheckedChange={(checked) => toggle(option, checked === true)}
            />
            <Label
              htmlFor={`home-school-${index}`}
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

// Filter based on Home Department
export const HomeDepartmentFilter = ({
  homeDepartment,
  selectedDepartment,
  setSelectedDepartment,
}: {
  homeDepartment: string[];
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
            title="Clear Home Department filter"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
        {homeDepartment?.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox
              id={`home-dept-${index}`}
              checked={selectedDepartment.includes(option)}
              onCheckedChange={(checked) => toggle(option, checked === true)}
            />
            <Label
              htmlFor={`home-dept-${index}`}
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

// Filter based on Course Term
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

// Filter based on Course Department
export const CourseDepartmentFilter = ({
  courseDepartment,
  selectedCourseDepartment,
  setSelectedCourseDepartment,
}: {
  courseDepartment: string[];
  selectedCourseDepartment: string[];
  setSelectedCourseDepartment: (value: string[]) => void;
}) => {
  const toggle = (option: string, checked: boolean) => {
    if (checked)
      setSelectedCourseDepartment([...selectedCourseDepartment, option]);
    else
      setSelectedCourseDepartment(
        selectedCourseDepartment.filter((x) => x !== option)
      );
  };
  return (
    <div className="flex flex-col gap-2 select-none">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          {selectedCourseDepartment.length > 0
            ? `${selectedCourseDepartment.length} selected`
            : "Select one or more"}
        </span>
        {selectedCourseDepartment.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setSelectedCourseDepartment([])}
            title="Clear Course Department filter"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
        {courseDepartment?.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox
              id={`course-dept-${index}`}
              checked={selectedCourseDepartment.includes(option)}
              onCheckedChange={(checked) => toggle(option, checked === true)}
            />
            <Label
              htmlFor={`course-dept-${index}`}
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
