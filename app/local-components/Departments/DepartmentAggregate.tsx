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
import MaxAndActualEnrollmentChart from "./MaxAndActualEnrollmentChart";

interface DepartmentStatistic {
  Course_Term_Code: string;
  Course_Count: number;
  Total_Max_Enrollment: number;
  Total_Actual_Enrollment: number;
  Total_Seats_Available: number;
}

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
  const [departmentStatistics, setDepartmentStatistics] = useState<
    DepartmentStatistic[]
  >([]);
  const [fallStatistics, setFallStatistics] = useState<DepartmentStatistic[]>(
    []
  );
  const [springStatistics, setSpringStatistics] = useState<
    DepartmentStatistic[]
  >([]);
  const [summerStatistics, setSummerStatistics] = useState<
    DepartmentStatistic[]
  >([]);

  useEffect(() => {
    getEachDepartmentStatistics(selectedDepartment).then(
      (data: DepartmentStatistic[]) => {
        setDepartmentStatistics(data);

        // Categorize by semester
        const spring = data.filter(
          (item: DepartmentStatistic) =>
            item.Course_Term_Code.slice(-2) === "01"
        );
        const summer = data.filter(
          (item: DepartmentStatistic) =>
            item.Course_Term_Code.slice(-2) === "02"
        );
        const fall = data.filter(
          (item: DepartmentStatistic) =>
            item.Course_Term_Code.slice(-2) === "03"
        );

        setSpringStatistics(spring);
        setSummerStatistics(summer);
        setFallStatistics(fall);
      }
    );
  }, [selectedDepartment]);

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
          <MaxAndActualEnrollmentChart
            springStatistics={springStatistics}
            summerStatistics={summerStatistics}
            fallStatistics={fallStatistics}
            XAxisDataKey="Course_Term_Code"
            YAxisDataKey="Total_Max_Enrollment"
            YAxisLabel="Total Max Enrollment"
            strokeColor="#0072b2"
          />
        </div>

        {/* For Total Actual Enrollment.  Total_Actual_Enrollment*/}
        <div className="w-1/2 h-full">
          <MaxAndActualEnrollmentChart
            springStatistics={springStatistics}
            summerStatistics={summerStatistics}
            fallStatistics={fallStatistics}
            XAxisDataKey="Course_Term_Code"
            YAxisDataKey="Total_Actual_Enrollment"
            YAxisLabel="Total Actual Enrollment"
            strokeColor="#0072b2"
          />
        </div>
      </div>
    </div>
  );
};

export default DepartmentAggregate;
