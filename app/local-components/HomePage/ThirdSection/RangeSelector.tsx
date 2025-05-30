"use client";
import { useState, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import upIcon from "@/assets/up-icon.png";
import downIcon from "@/assets/down-icon.png";
import Image from "next/image";

const RangeSelector = ({
  filterValues,
  selectedRange,
  setSelectedRange,
}: {
  filterValues: string[];
  selectedRange: number | null;
  setSelectedRange: (range: number | null) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle radio change
  const handleRadioChange = (term: string) => {
    const startYear = parseInt(term.substring(0, 4));
    setSelectedRange(startYear);
  };

  console.log("Filter Values:", filterValues);
  // range to be collected from backend
  // Create dynamic terms array from filterValues
  const yearRange = useMemo(() => {
    const years = filterValues.map((item) => item.substring(0, 4));

    const uniqueYears = [...new Set(years)];
    const sortedYears = uniqueYears.sort((a, b) => parseInt(b) - parseInt(a));
    return sortedYears.map((year) => {
      const prevYear = (parseInt(year) - 4).toString();
      return `${year}-${prevYear}`;
    });
  }, [filterValues]);

  // const yearRange = [
  //   "2024-2020",
  //   "2023-2019",
  //   "2022-2018",
  //   "2021-2017",
  //   "2020-2016",
  //   "2019-2015",
  //   "2018-2014",
  // ];

  return (
    <div className="flex items-center select-none">
      <p className="mr-4">Select the 5 year range</p>
      <DropdownMenu open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <DropdownMenuTrigger asChild>
          <Button
            className="relative px-4 py-2 border border-gray-300 rounded bg-white text-black cursor-pointer flex items-center hover:bg-[#F9F9F8] focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            Year
            <span className="ml-1"></span>
            <Image
              src={upIcon}
              alt="up icon"
              className={`absolute right-2 w-4 h-4 transition-opacity duration-300 ease-in-out ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            />
            <Image
              src={downIcon}
              alt="down icon"
              className={`absolute right-2 w-4 h-4 transition-opacity duration-300 ease-in-out ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-h-48 overflow-y-auto">
          {yearRange.map((year) => (
            <DropdownMenuItem key={year} onSelect={(e) => e.preventDefault()}>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  checked={selectedRange === parseInt(year.substring(0, 4))}
                  onChange={() => handleRadioChange(year)}
                  className="form-radio"
                />
                <span>{year}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default RangeSelector;
