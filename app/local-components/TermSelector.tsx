"use client";
import { useState } from "react";
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

const TermSelector = ({ setYear }: { setYear: (year: number) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTerms, setSelectedTerms] = useState<string[]>([]);

  const handleCheckboxChange = (term: string) => {
    setSelectedTerms((prevSelectedTerms) =>
      prevSelectedTerms.includes(term)
        ? prevSelectedTerms.filter((t) => t !== term)
        : [...prevSelectedTerms, term]
    );
    setYear(parseInt(term));
  };

  const terms = [
    "2024-2025",
    "2023-2024",
    "2022-2023",
    "2021-2022",
    "2020-2021",
    "2019-2020",
    "2018-2019",
    "2017-2018",
    "2016-2017",
    "2015-2016",
    "2014-2015",
    "2013-2014",
  ];

  return (
    <div className="flex items-center select-none">
      <p className="mr-4">Select a year</p>
      <DropdownMenu open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <DropdownMenuTrigger asChild>
          <Button
            className="relative px-4 py-2 border border-gray-300 rounded bg-white text-black cursor-pointer flex items-center hover:bg-[#F9F9F8] focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            Term code
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
                  type="checkbox"
                  checked={selectedTerms.includes(term)}
                  onChange={() => handleCheckboxChange(term)}
                  className="form-checkbox"
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

export default TermSelector;
