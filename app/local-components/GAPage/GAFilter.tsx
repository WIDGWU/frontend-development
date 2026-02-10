import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

// Filter based on GA Type
export const GATypeFilter = ({
  gaType,
  selectedGAType,
  setSelectedGAType,
}: {
  gaType: string[];
  selectedGAType: string | null;
  setSelectedGAType: (value: string | null) => void;
}) => {
  return (
    <div className="flex items-center gap-2 select-none">
      <Select
        value={selectedGAType || undefined}
        onValueChange={(value) => setSelectedGAType(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a GA Type">
            {selectedGAType || "Select a GA Type"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {gaType?.map((scholarship, index) => (
            <SelectItem key={index} value={scholarship}>
              {scholarship}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedGAType && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setSelectedGAType(null)}
          title="Clear GA Type filter"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
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
  selectedHomeSchool: string | null;
  setSelectedHomeSchool: (value: string | null) => void;
}) => {
  return (
    <div className="flex items-center gap-2 select-none">
      <Select
        value={selectedHomeSchool || undefined}
        onValueChange={(value) => setSelectedHomeSchool(value)}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select a Home School">
            {selectedHomeSchool || "Select a Home School"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {homeschool?.map((school, index) => (
            <SelectItem key={index} value={school}>
              {school}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedHomeSchool && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setSelectedHomeSchool(null)}
          title="Clear Home School filter"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
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
  selectedDepartment: string | null;
  setSelectedDepartment: (value: string | null) => void;
}) => {
  return (
    <div className="flex items-center gap-2 select-none">
      <Select
        value={selectedDepartment || undefined}
        onValueChange={(value) => setSelectedDepartment(value)}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select a Home Department">
            {selectedDepartment || "Select a Home Department"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {homeDepartment?.map((dept, index) => (
            <SelectItem key={index} value={dept}>
              {dept}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedDepartment && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setSelectedDepartment(null)}
          title="Clear Home Department filter"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
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
  selectedCourseTerm: string | null;
  setSelectedCourseTerm: (value: string | null) => void;
}) => {
  return (
    <div className="flex items-center gap-2 select-none">
      <Select
        value={selectedCourseTerm || undefined}
        onValueChange={(value) => setSelectedCourseTerm(value)}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select Course Term">
            {selectedCourseTerm || "Select Course Term"}
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
      {selectedCourseTerm && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setSelectedCourseTerm(null)}
          title="Clear Course Term filter"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
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
  selectedCourseDepartment: string | null;
  setSelectedCourseDepartment: (value: string | null) => void;
}) => {
  return (
    <div className="flex items-center gap-2 select-none">
      <Select
        value={selectedCourseDepartment || undefined}
        onValueChange={(value) => setSelectedCourseDepartment(value)}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select Teaching Department">
            {selectedCourseDepartment || "Select Teaching Department"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {courseDepartment?.map((course, index) => (
            <SelectItem key={index} value={course}>
              {course}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedCourseDepartment && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setSelectedCourseDepartment(null)}
          title="Clear Course Department filter"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
