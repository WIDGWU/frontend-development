"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const RangeSelector = ({
  filterValues,
  selectedRange,
  setSelectedRange,
}: {
  filterValues: { startYear: number; range: string }[];
  selectedRange: number | null;
  setSelectedRange: (range: number | null) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle radio change
  const handleRadioChange = (year: { startYear: number; range: string }) => {
    setSelectedRange(year.startYear);
  };

  return (
    <div className="flex items-center select-none">
      <p className="mr-4">Select the 5 year range</p>
      <DropdownMenu open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <DropdownMenuTrigger asChild>
          <Button
            className="relative px-4 py-2 border border-gray-300 rounded bg-white text-black cursor-pointer flex items-center gap-1 hover:bg-[#F9F9F8] focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>Year</span>

            <ArrowDown
              className={`transition-all duration-300 ${
                isOpen ? "-rotate-180" : ""
              }`}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-h-48 overflow-y-auto">
          {filterValues.map((year) => (
            <DropdownMenuItem
              key={year.range}
              onSelect={(e) => e.preventDefault()}
            >
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  checked={selectedRange === year.startYear}
                  onChange={() => handleRadioChange(year)}
                  className="form-radio"
                />
                <span>{year.range}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default RangeSelector;
