import { useState, useEffect } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  getCollectiveGADetails,
  getGACategoryDetails,
} from "@/app/api/reports";
import {
  CourseTermFilter,
  GATypeFilter,
} from "@/app/local-components/GAPage/GAFilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Loader } from "@/app/local-components/Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { CourseDetailModal } from "@/app/local-components/GAPage/CourseDetailModal";

type GA = {
  GA_Net_ID: string;
  GA_Type: string;
  Home_School: string;
  GA_First_Name: string;
  GA_Last_Name: string;
  Courses: string;
  Term_Codes: string;
  Total_Actual_Enrollment: number;
  Total_Max_Enrollment: number;
};

type GAResponse = {
  results: GA[];
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
};

const AggregateView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialPage = Number(searchParams.get("page") ?? "1") || 1;
  const initialPageSize = Number(searchParams.get("page_size") ?? "50") || 50;
  const initialSearch = searchParams.get("search") ?? "";
  const initialGAType = searchParams.get("ga_type") ?? null;
  const initialCourseTermCode = searchParams.get("course_term_code") ?? null;

  const [filteredGA, setFilteredGA] = useState<GA[]>([]);
  const [totalGACount, setTotalGACount] = useState<number>(0);
  const [gaType, setGAType] = useState<string[]>([]);
  const [selectedGAType, setSelectedGAType] = useState<string | null>(
    initialGAType
  );
  const [courseTerm, setCourseTerm] = useState<string[]>([]);
  const [selectedCourseTerm, setSelectedCourseTerm] = useState<string | null>(
    initialCourseTermCode
  );

  const [page, setPage] = useState<number>(initialPage);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [searchInput, setSearchInput] = useState<string>(initialSearch);
  const [search, setSearch] = useState<string>(initialSearch);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  // Function to get initials of first name and last name
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  // Function to clear all filters
  const clearFilters = () => {
    setSelectedGAType(null);
    setSelectedCourseTerm(null);
  };

  // Fetch data from API using React Query
  const {
    data: gaCategoryDetails,
    isLoading: isGaCategoryLoading,
    isError: isGaCategoryError,
  } = useQuery({
    queryKey: ["gaCategoryDetails"],
    queryFn: getGACategoryDetails,
  });

  // Build filters object for API call
  const filters = {
    ...(selectedGAType ? { ga_type: selectedGAType } : {}),
    ...(selectedCourseTerm ? { course_term_code: selectedCourseTerm } : {}),
  };

  const {
    data: gaDetails,
    isLoading: isGaDetailsLoading,
    isError: isGaDetailsError,
  } = useQuery<GAResponse>({
    queryKey: [
      "collectiveGADetails",
      page,
      pageSize,
      search,
      selectedGAType,
      selectedCourseTerm,
    ],
    queryFn: () => getCollectiveGADetails(page, pageSize, search, filters),
    placeholderData: keepPreviousData,
  });

  // Sync category data into local state once loaded
  useEffect(() => {
    if (!gaCategoryDetails) return;
    setGAType(gaCategoryDetails.GA_Type);
    setCourseTerm(gaCategoryDetails.Course_Term_Code);
  }, [gaCategoryDetails]);

  // Sync GA details into local state once loaded
  // Since filtering is now done server-side, filteredGA is just the results
  useEffect(() => {
    if (!gaDetails) return;
    const pageResults = gaDetails.results || [];
    setFilteredGA(pageResults);
    setTotalGACount(gaDetails.total ?? pageResults.length);
  }, [gaDetails]);

  const isLoading = isGaCategoryLoading || isGaDetailsLoading;
  const isError = isGaCategoryError || isGaDetailsError;

  const currentPage = gaDetails?.page ?? page;
  const totalPages = Math.max(1, gaDetails?.total_pages ?? 1);

  // Debounce search input to avoid refetching on every keypress
  useEffect(() => {
    const handle = setTimeout(() => {
      setSearch(searchInput.trim());
    }, 300);
    return () => clearTimeout(handle);
  }, [searchInput]);

  // Reset to page 1 whenever search, page size, or filters change
  useEffect(() => {
    setPage(1);
  }, [search, pageSize, selectedGAType, selectedCourseTerm]);

  // Sync pagination + search + filters state to the URL so results can be shared
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (page > 1) params.set("page", String(page));
    if (pageSize !== 50) params.set("page_size", String(pageSize));
    if (selectedGAType) params.set("ga_type", selectedGAType);
    if (selectedCourseTerm) params.set("course_term_code", selectedCourseTerm);

    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    router.replace(url, { scroll: false });
  }, [
    search,
    page,
    pageSize,
    selectedGAType,
    selectedCourseTerm,
    pathname,
    router,
  ]);

  const PaginationControls = () => (
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
        disabled={currentPage <= 1}
      >
        Previous
      </Button>
      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
        disabled={currentPage >= totalPages}
      >
        Next
      </Button>
    </div>
  );

  if (isLoading) {
    return (
      <main className="m-4">
        <Loader />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="m-4">
        <div className="flex items-center justify-center h-96">
          <p className="text-lg text-red-600">
            There was a problem loading Graduate Assistant data.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="m-4">
      <div className="flex items-center justify-end my-4">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="gap-2 bg-primary text-white hover:bg-primary/95 hover:text-light"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>

          <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filter Graduate Assistants</SheetTitle>
              <SheetDescription>
                Select filters to narrow down your search results
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="ga-type">
                  <AccordionTrigger>GA Type</AccordionTrigger>
                  <AccordionContent>
                    <GATypeFilter
                      gaType={gaType}
                      selectedGAType={selectedGAType}
                      setSelectedGAType={setSelectedGAType}
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="course-term">
                  <AccordionTrigger>Course Term</AccordionTrigger>
                  <AccordionContent>
                    <CourseTermFilter
                      courseTerm={courseTerm}
                      selectedCourseTerm={selectedCourseTerm}
                      setSelectedCourseTerm={setSelectedCourseTerm}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="mt-6">
                <Button onClick={clearFilters} className="w-full">
                  Clear all filters
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4 my-4">
        <div className="flex-1">
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder='Search (e.g., "doe")'
            className="border-primary"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Page size</span>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => setPageSize(Number(value))}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>

          {searchInput.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchInput("")}
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between my-4">
        <h4 className="text-lg font-semibold">
          Showing {filteredGA.length} on this page (Total: {totalGACount})
        </h4>
        <PaginationControls />
      </div>

      {filteredGA.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredGA.map((g, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-white">
                  {getInitials(g.GA_First_Name, g.GA_Last_Name)}
                </div>

                <h1 className="text-2xl font-semibold my-4 text-center">
                  {g.GA_First_Name} {g.GA_Last_Name}
                </h1>
                <div>
                  <p className="text-left text-gray-600">
                    <span className="font-bold">GA Type : </span> {g.GA_Type}
                  </p>

                  <p className="text-left text-gray-600">
                    <span className="font-bold">GA Net ID: </span>
                    {g.GA_Net_ID}
                  </p>
                  <p className="text-left text-gray-600">
                    <span className="font-bold">Home School: </span>
                    {g.Home_School}
                  </p>
                  <p className="text-left text-gray-600">
                    <span className="font-bold">Total Actual Enrollment: </span>
                    {g.Total_Actual_Enrollment}
                  </p>
                  <p className="text-left text-gray-600">
                    <span className="font-bold">Total Maximum Enrollment:</span>
                    {g.Total_Max_Enrollment}
                  </p>
                  <p className="text-left text-gray-600">
                    <span className="font-bold">Courses : </span>
                    <span className="flex flex-col space-y-2 mt-2">
                      {g.Courses &&
                        g.Courses.split(",").map((courseId, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() =>
                              setSelectedCourseId(courseId.trim())
                            }
                            className="w-full bg-gray-200 px-2 py-1 rounded-full text-sm mr-2 text-center hover:bg-gray-300 cursor-pointer"
                          >
                            {courseId.trim()}
                          </button>
                        ))}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center text-4xl h-96">
          Sorry, No matching results were found.
        </div>
      )}

      <div className="flex justify-end mt-6">
        <PaginationControls />
      </div>

      <CourseDetailModal
        courseId={selectedCourseId}
        onClose={() => setSelectedCourseId(null)}
      />
    </main>
  );
};

export default AggregateView;
