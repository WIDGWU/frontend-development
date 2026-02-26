import { useState, useEffect } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  getCoursesWithGATerms,
  getGACategoryDetails,
} from "@/app/api/reports";
import {
  CourseTermFilter,
  GATypeFilter,
  HomeDepartmentFilter,
  HomeSchoolFilter,
  CourseDepartmentFilter,
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

type CourseAssignment = {
  COURSE_ID: string;
  Course_Number: string;
  Course_College_Desc: string;
  Term_Codes: string;
};

type CourseAssignmentResponse = {
  results: CourseAssignment[];
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
};

const GAAssignmentRecordView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialPage = Number(searchParams.get("page") ?? "1") || 1;
  const initialPageSize = Number(searchParams.get("page_size") ?? "50") || 50;
  const initialSearch = searchParams.get("search") ?? "";
  const initialGAType =
    searchParams.get("ga_type")?.split(",").filter(Boolean) ?? [];
  const initialHomeSchool =
    searchParams.get("home_school")?.split(",").filter(Boolean) ?? [];
  const initialHomeDept =
    searchParams.get("home_dept")?.split(",").filter(Boolean) ?? [];
  const initialCourseTermCode =
    searchParams.get("course_term_code")?.split(",").filter(Boolean) ?? [];
  const initialCoursePrefix =
    searchParams.get("course_prefix")?.split(",").filter(Boolean) ?? [];

  const [courses, setCourses] = useState<CourseAssignment[]>([]);
  const [totalCourseCount, setTotalCourseCount] = useState<number>(0);

  const [gaType, setGAType] = useState<string[]>([]);
  const [selectedGAType, setSelectedGAType] =
    useState<string[]>(initialGAType);

  const [homeSchool, setHomeSchool] = useState<string[]>([]);
  const [selectedHomeSchool, setSelectedHomeSchool] =
    useState<string[]>(initialHomeSchool);

  const [homeDepartment, setHomeDepartment] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] =
    useState<string[]>(initialHomeDept);

  const [courseTerm, setCourseTerm] = useState<string[]>([]);
  const [selectedCourseTerm, setSelectedCourseTerm] = useState<string[]>(
    initialCourseTermCode
  );

  const [courseDepartment, setCourseDepartment] = useState<string[]>([]);
  const [selectedCourseDepartment, setSelectedCourseDepartment] = useState<
    string[]
  >(initialCoursePrefix);

  const [page, setPage] = useState<number>(initialPage);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [searchInput, setSearchInput] = useState<string>(initialSearch);
  const [search, setSearch] = useState<string>(initialSearch);
  const [sheetOpen, setSheetOpen] = useState(false);

  const clearFilters = () => {
    setSelectedGAType([]);
    setSelectedHomeSchool([]);
    setSelectedDepartment([]);
    setSelectedCourseTerm([]);
    setSelectedCourseDepartment([]);
  };

  const {
    data: gaCategoryDetails,
    isLoading: isGaCategoryLoading,
    isError: isGaCategoryError,
  } = useQuery({
    queryKey: ["gaCategoryDetails"],
    queryFn: getGACategoryDetails,
  });

  const filters = {
    ...(selectedGAType.length > 0 ? { ga_type: selectedGAType.join(",") } : {}),
    ...(selectedHomeSchool.length > 0
      ? { home_school: selectedHomeSchool.join(",") }
      : {}),
    ...(selectedDepartment.length > 0
      ? { home_dept: selectedDepartment.join(",") }
      : {}),
    ...(selectedCourseTerm.length > 0
      ? { course_term_code: selectedCourseTerm.join(",") }
      : {}),
    ...(selectedCourseDepartment.length > 0
      ? { course_prefix: selectedCourseDepartment.join(",") }
      : {}),
  };

  const {
    data: courseAssignments,
    isLoading: isCoursesLoading,
    isError: isCoursesError,
  } = useQuery<CourseAssignmentResponse>({
    queryKey: [
      "coursesWithGATerms",
      page,
      pageSize,
      search,
      selectedGAType,
      selectedHomeSchool,
      selectedDepartment,
      selectedCourseTerm,
      selectedCourseDepartment,
    ],
    queryFn: () => getCoursesWithGATerms(page, pageSize, search, filters),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!gaCategoryDetails) return;
    setGAType(gaCategoryDetails.GA_Type);
    setHomeSchool(gaCategoryDetails.Home_School);
    setHomeDepartment(gaCategoryDetails.Home_Dept);
    setCourseTerm(gaCategoryDetails.Course_Term_Code);
    setCourseDepartment(gaCategoryDetails.Course_Prefix);
  }, [gaCategoryDetails]);

  useEffect(() => {
    if (!courseAssignments) return;
    const pageResults = courseAssignments.results || [];
    setCourses(pageResults);
    setTotalCourseCount(courseAssignments.total ?? pageResults.length);
  }, [courseAssignments]);

  const isLoading = isGaCategoryLoading || isCoursesLoading;
  const isError = isGaCategoryError || isCoursesError;

  const currentPage = courseAssignments?.page ?? page;
  const totalPages = Math.max(1, courseAssignments?.total_pages ?? 1);

  const hasActiveFilters =
    selectedGAType.length > 0 ||
    selectedHomeSchool.length > 0 ||
    selectedDepartment.length > 0 ||
    selectedCourseTerm.length > 0 ||
    selectedCourseDepartment.length > 0;

  useEffect(() => {
    const handle = setTimeout(() => {
      setSearch(searchInput.trim());
    }, 300);
    return () => clearTimeout(handle);
  }, [searchInput]);

  useEffect(() => {
    setPage(1);
  }, [
    search,
    pageSize,
    selectedGAType,
    selectedHomeSchool,
    selectedDepartment,
    selectedCourseTerm,
    selectedCourseDepartment,
  ]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (page > 1) params.set("page", String(page));
    if (pageSize !== 50) params.set("page_size", String(pageSize));
    if (selectedGAType.length) params.set("ga_type", selectedGAType.join(","));
    if (selectedHomeSchool.length)
      params.set("home_school", selectedHomeSchool.join(","));
    if (selectedDepartment.length)
      params.set("home_dept", selectedDepartment.join(","));
    if (selectedCourseTerm.length)
      params.set("course_term_code", selectedCourseTerm.join(","));
    if (selectedCourseDepartment.length)
      params.set("course_prefix", selectedCourseDepartment.join(","));

    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    router.replace(url, { scroll: false });
  }, [
    search,
    page,
    pageSize,
    selectedGAType,
    selectedHomeSchool,
    selectedDepartment,
    selectedCourseTerm,
    selectedCourseDepartment,
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
            There was a problem loading GA assignment records.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="m-4">
      <div className="flex items-center justify-end my-4">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button onClick={clearFilters} className="">
                Clear all filters
              </Button>
            )}

            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 bg-primary text-white hover:bg-primary/95 hover:text-light"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
          </div>

          <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filter GA Assignment Records</SheetTitle>
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
                <AccordionItem value="home-school">
                  <AccordionTrigger>Home School</AccordionTrigger>
                  <AccordionContent>
                    <HomeSchoolFilter
                      homeschool={homeSchool}
                      selectedHomeSchool={selectedHomeSchool}
                      setSelectedHomeSchool={setSelectedHomeSchool}
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="home-department">
                  <AccordionTrigger>Home Department</AccordionTrigger>
                  <AccordionContent>
                    <HomeDepartmentFilter
                      homeDepartment={homeDepartment}
                      selectedDepartment={selectedDepartment}
                      setSelectedDepartment={setSelectedDepartment}
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
                <AccordionItem value="course-department">
                  <AccordionTrigger>Course Department</AccordionTrigger>
                  <AccordionContent>
                    <CourseDepartmentFilter
                      courseDepartment={courseDepartment}
                      selectedCourseDepartment={selectedCourseDepartment}
                      setSelectedCourseDepartment={setSelectedCourseDepartment}
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
            placeholder='Search (e.g., "AH 2001W" or "Columbian College")'
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
          Showing {courses.length} on this page (Total: {totalCourseCount})
        </h4>
        <PaginationControls />
      </div>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {courses.map((course, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white py-8 px-4 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col items-center space-y-4">
                <div>
                  <h1 className="mb-2 text-2xl font-semibold text-center">
                    {course.Course_Number}
                  </h1>

                  <span className="text-[14px] px-2 py-1 rounded-full bg-gray-200">
                    {course.COURSE_ID}
                  </span>
                </div>

                <div className="text-center text-gray-600">
                  <p className="font-bold">College: </p>
                  {course.Course_College_Desc}
                </div>

                <div className="w-full">
                  <div className="text-left text-gray-600">
                    <p className="font-bold text-center">Terms with GA assignments</p>
                    <span className="flex flex-col space-y-2 mt-2">
                      {course.Term_Codes &&
                        course.Term_Codes.split(",").map((term, termIndex) => (
                          <span
                            key={termIndex}
                            className="w-full bg-gray-200 px-2 py-1 rounded-full text-sm mr-2 text-center"
                          >
                            {term.trim()}
                          </span>
                        ))}
                    </span>
                  </div>
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
    </main>
  );
};

export default GAAssignmentRecordView;

