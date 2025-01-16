import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <div className="flex items-center select-none">
      <Select onValueChange={(value) => setSelectedGAType(value)}>
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
    <div className="flex items-center select-none">
      <Select onValueChange={(value) => setSelectedHomeSchool(value)}>
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
    <div className="flex items-center select-none">
      <Select onValueChange={(value) => setSelectedDepartment(value)}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select a Department">
            {selectedDepartment || "Select a Department"}
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
    <div className="flex items-center select-none">
      <Select onValueChange={(value) => setSelectedCourseTerm(value)}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select a Course Term">
            {selectedCourseTerm || "Select a Course Term"}
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
