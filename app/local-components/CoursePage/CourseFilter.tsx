import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CourseFilter = ({
  department,
  selectedDepartment,
  setSelectedDepartment,
}: {
  department: string[];
  selectedDepartment: string | null;
  setSelectedDepartment: (value: string | null) => void;
}) => {
  return (
    <div className="flex items-center select-none">
      <Select onValueChange={(value) => setSelectedDepartment(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a department">
            {selectedDepartment || "Select a department"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {department?.map((dept, index) => (
            <SelectItem key={index} value={dept}>
              {dept}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CourseFilter;
