import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState, useEffect } from "react";
import { getEachDepartmentStatistics } from "@/app/api/reports";
import DepartmentChart from "./DepartmentChart";

// Define interface for component props
interface DepartmentAggregateProps {
  department: string[];
  selectedDepartment: string | null;
  setDepartment: (value: string) => void;
}

const DepartmentAggregate = ({
  department,
  selectedDepartment,
  setDepartment,
}: DepartmentAggregateProps) => {
  const [departmentStatistics, setDepartmentStatistics] = useState<any[]>([]);

  useEffect(() => {
    getEachDepartmentStatistics(selectedDepartment).then((data) => {
      setDepartmentStatistics(data);
    });
  }, [selectedDepartment]);

  console.log("departmentStatistics", departmentStatistics);

  return (
    <div className="bg-white rounded-xl w-full h-auto p-4 m-2">
      <div className="flex items-center justify-between my-4">
        <h4 className="text-xl font-semibold">Charts for each department</h4>
      </div>
      <div className="flex items-center select-none">
        <Select onValueChange={(value) => setDepartment(value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select department">
              {selectedDepartment || "Select department"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {department?.map((dep, index) => (
              <SelectItem key={index} value={dep}>
                {dep}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-full h-96 m-4 flex flex-row">
        {/* For Course Count */}
        <div className="w-1/2 h-full px-2">
          <DepartmentChart
            departmentStatistics={departmentStatistics}
            XAxisDataKey="Course_Term_Code"
            YAxisDataKey="Course_Count"
            YAxisLabel="Course Count"
            strokeColor="#0072b2"
          />
        </div>
        {/* For Seats Available */}
        <div className="w-1/2 h-full px-2">
          <DepartmentChart
            departmentStatistics={departmentStatistics}
            XAxisDataKey="Course_Term_Code"
            YAxisDataKey="Total_Seats_Available"
            YAxisLabel="Seats Available"
            strokeColor="#56b4e9"
          />
        </div>
      </div>
      <div className="w-full h-96 m-4 flex flex-row">
        {/* For Total Max Enrollment Total_Max_Enrollment */}
        <div className="w-1/2 h-full">
          <DepartmentChart
            departmentStatistics={departmentStatistics}
            XAxisDataKey="Course_Term_Code"
            YAxisDataKey="Total_Max_Enrollment"
            YAxisLabel="Total Max Enrollment"
            strokeColor="#0072b2"
          />
        </div>

        {/* For Total Actual Enrollment.  Total_Actual_Enrollment*/}
        <div className="w-1/2 h-full">
          <DepartmentChart
            departmentStatistics={departmentStatistics}
            XAxisDataKey="Course_Term_Code"
            YAxisDataKey="Total_Actual_Enrollment"
            YAxisLabel="Total Actual Enrollment"
            strokeColor="#56b4e9"
          />
        </div>
      </div>
    </div>
  );
};

export default DepartmentAggregate;
