"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowDown, Check } from "lucide-react";

const YearSelector = ({
  filterValues,
  setYear,
}: {
  filterValues: { year: number; academicYear: string }[];
  setYear: (year: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(filterValues[0]);

  const handleSelect = (term: { year: number; academicYear: string }) => {
    setSelectedYear(term);
    setYear(term.year);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-slate-600 font-medium">Academic Year</span>

      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="
              flex items-center gap-2
              rounded-full px-4 py-2
              border-slate-300
              bg-white
              hover:bg-slate-50
              text-slate-800
              text-md
            "
          >
            <span className="font-medium">{selectedYear?.academicYear}</span>
            <ArrowDown
              className={`h-4 w-4 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="w-44 p-1">
          {filterValues.map((term) => {
            const isSelected = selectedYear?.academicYear === term.academicYear;

            return (
              <DropdownMenuItem
                key={term.academicYear}
                onSelect={() => handleSelect(term)}
                className={`
                  flex items-center justify-between
                  cursor-pointer rounded-md px-3 py-2
                  text-md
                  ${
                    isSelected
                      ? "bg-slate-100 font-medium"
                      : "hover:bg-slate-50"
                  }
                `}
              >
                <span>{term.academicYear}</span>
                {isSelected && <Check className="h-4 w-4 text-slate-700" />}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default YearSelector;
