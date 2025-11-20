"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const YearSelector = ({
  filterValues,
  setYear,
}: {
  filterValues: { year: number; academicYear: string }[];
  setYear: (year: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(
    filterValues[0]?.academicYear || null
  );

  // Create dynamic terms array from filterValues
  // const terms = useMemo(() => {
  //   const years = filterValues.map((item) => item.substring(0, 4));
  //   const uniqueYears = [...new Set(years)];
  //   const sortedYears = uniqueYears.sort((a, b) => parseInt(b) - parseInt(a));
  //   return sortedYears.map((year) => {
  //     const nextYear = (parseInt(year) + 1).toString();
  //     return `${year}-${nextYear}`;
  //   });
  // }, [filterValues]);

  const handleRadioChange = (term: { year: number; academicYear: string }) => {
    setSelectedTerm(term.academicYear);
    setYear(term.year);
  };

  console.log("filterValues in YearSelector:", filterValues);

  return (
    <div className="flex items-center select-none">
      <p className="mr-4">Select a year</p>
      <DropdownMenu open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <DropdownMenuTrigger asChild>
          <Button
            className="relative px-4 py-2 border border-gray-300 rounded bg-white text-black cursor-pointer flex items-center gap-1 hover:bg-[#F9F9F8] focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>Year</span>

            <ArrowDown className={`transition-all duration-300 ${isOpen ? "-rotate-180" : ""}`} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-h-48 overflow-y-auto">
          {filterValues.map((term) => (
            <DropdownMenuItem
              key={term.academicYear}
              onSelect={(e) => e.preventDefault()}
            >
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  checked={selectedTerm === term.academicYear}
                  onChange={() => handleRadioChange(term)}
                  className="form-radio"
                />
                <span>{term.academicYear}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default YearSelector;
