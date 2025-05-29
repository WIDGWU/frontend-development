"use client";
import React, { useState, useMemo } from "react";
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

const YearSelector = ({
  filterValues,
  setYear,
}: {
  filterValues: string[];
  setYear: (year: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);

  // Create dynamic terms array from filterValues
  const terms = useMemo(() => {
    const years = filterValues.map((item) => item.substring(0, 4));
    const uniqueYears = [...new Set(years)];
    const sortedYears = uniqueYears.sort((a, b) => parseInt(b) - parseInt(a));
    return sortedYears.map((year) => {
      const nextYear = (parseInt(year) + 1).toString();
      return `${year}-${nextYear}`;
    });
  }, [filterValues]);

  const handleRadioChange = (term: string) => {
    setSelectedTerm(term);
    setYear(parseInt(term.split("-")[0]));
  };

  console.log("filterValues in YearSelector:", filterValues);

  return (
    <div className="flex items-center select-none">
      <p className="mr-4">Select a year</p>
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
          {terms.map((term) => (
            <DropdownMenuItem key={term} onSelect={(e) => e.preventDefault()}>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  checked={selectedTerm === term}
                  onChange={() => handleRadioChange(term)}
                  className="form-radio"
                />
                <span>{term}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default YearSelector;
