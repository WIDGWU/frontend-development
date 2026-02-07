"use client";

import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowDown, X } from "lucide-react";

const TermSelector = ({
  filterValues,
  selectedTerm,
  setSelectedTerm,
}: {
  filterValues: string[];
  selectedTerm: string[];
  setSelectedTerm: (term: string[]) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [availableTerms, setAvailableTerms] = useState<string[]>([]);

  useEffect(() => {
    setAvailableTerms(
      filterValues?.filter((term) => !selectedTerm.includes(term))
    );
  }, [filterValues, selectedTerm]);

  const handleAddTerm = (term: string) => {
    setSelectedTerm([...selectedTerm, term]);
  };

  const handleRemoveTerm = (term: string) => {
    setSelectedTerm(selectedTerm.filter((t) => t !== term));
  };

  return (
    <div className="flex flex-col gap-3 select-none">
      {/* Label */}
      <div className="flex items-center gap-3">
        <p className="text-slate-600 font-medium">
          Select terms to compare
        </p>

        {/* Dropdown */}
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-slate-800 hover:bg-slate-50"
            >
              <span>Add term</span>
              <ArrowDown
                className={`h-4 w-4 transition-transform ${
                  isOpen ? "-rotate-180" : ""
                }`}
              />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="max-h-56 w-56 overflow-y-auto rounded-xl">
            {availableTerms?.length === 0 && (
              <div className="px-4 py-2 text-sm text-slate-400">
                All terms selected
              </div>
            )}

            {availableTerms?.map((term) => (
              <DropdownMenuItem
                key={term}
                onSelect={(e) => {
                  e.preventDefault();
                  handleAddTerm(term);
                }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedTerm.includes(term)}
                  readOnly
                  className="accent-slate-800"
                />
                <span>{term}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Selected Chips */}
      {selectedTerm.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTerm.map((term) => (
            <span
              key={term}
              className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700 border border-slate-300"
            >
              {term}
              <button
                onClick={() => handleRemoveTerm(term)}
                className="ml-1 rounded-full p-0.5 hover:bg-slate-300"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TermSelector;
