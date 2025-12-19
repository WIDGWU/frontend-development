"use client";
import { useState, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

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

  const selectedLabel = useMemo(() => {
    return (
      filterValues.find((v) => v.startYear === selectedRange)?.range ??
      "Select range"
    );
  }, [filterValues, selectedRange]);

  const handleSelect = (year: { startYear: number; range: string }) => {
    setSelectedRange(year.startYear);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-3 select-none">
      <span className="text-slate-600 font-medium">
        Select 5-year range
      </span>

      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="min-w-[180px] justify-between px-4 py-2 text-slate-800 bg-white hover:bg-slate-50 border-slate-300"
          >
            <span className="text-sm font-medium">
              {selectedLabel}
            </span>

            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-[180px] max-h-56 overflow-y-auto rounded-xl p-1"
        >
          {filterValues.map((year) => {
            const isSelected = selectedRange === year.startYear;

            return (
              <DropdownMenuItem
                key={year.range}
                onSelect={(e) => e.preventDefault()}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer
                  ${
                    isSelected
                      ? "bg-slate-100 font-medium text-slate-900"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                onClick={() => handleSelect(year)}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full border ${
                    isSelected
                      ? "bg-blue-600 border-blue-600"
                      : "border-slate-400"
                  }`}
                />
                <span className="text-sm">{year.range}</span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default RangeSelector;
