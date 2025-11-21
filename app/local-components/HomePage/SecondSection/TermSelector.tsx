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

  // Update availableTerms when years or selectedTerm changes
  useEffect(() => {
    // Filter out terms that are already selected
    const filteredTerms = filterValues.filter(
      (term) => !selectedTerm.includes(term)
    );
    setAvailableTerms(filteredTerms);
  }, [filterValues, selectedTerm]);

  // function to handle the checkbox
  const handleCheckbox = (term: string) => {
    setSelectedTerm([...selectedTerm, term]);
    setAvailableTerms(availableTerms.filter((t) => t !== term));
  };

  // function to remove the term from selected terms
  const handleRemoveTerm = (term: string) => {
    setSelectedTerm(selectedTerm.filter((t) => t !== term));
    setAvailableTerms([...availableTerms, term]);
  };

  return (
    <div className="flex flex-col items-start select-none space-y-4">
      <div className="flex items-center space-x-2">
        <p>Select terms to compare</p>
        <DropdownMenu open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
          <DropdownMenuTrigger asChild>
            <Button
              className="relative px-4 py-2 border border-gray-300 rounded bg-white text-black cursor-pointer flex items-center gap-1 hover:bg-[#F9F9F8] focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>Term</span>

              <ArrowDown
                className={`transition-all duration-300 ${
                  isOpen ? "-rotate-180" : ""
                }`}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-h-48 overflow-y-auto">
            {availableTerms.map((term) => (
              <DropdownMenuItem key={term} onSelect={(e) => e.preventDefault()}>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedTerm.includes(term)}
                    className="form-checkbox"
                    onChange={() => handleCheckbox(term)}
                  />
                  <span>{term}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedTerm.map((term) => (
          <p
            key={term}
            className="flex items-center justify-center bg-gray-200 px-4 py-3 rounded-full text-sm"
          >
            <span>{term}</span>
            <button onClick={() => handleRemoveTerm(term)} className="ml-2">
              <X size={16} className="p-0.5 bg-black text-white rounded-full" />
            </button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default TermSelector;
