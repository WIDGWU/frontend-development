"use client";
import React, { useState, useEffect } from "react";
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
              className="relative px-4 py-2 border border-gray-300 rounded bg-white text-black cursor-pointer flex items-center hover:bg-[#F9F9F8] focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              Term
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
          <span
            key={term}
            className="bg-gray-200 px-4 py-3 rounded-full text-sm"
          >
            {term}
            <button onClick={() => handleRemoveTerm(term)} className="ml-2">
              X
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TermSelector;
