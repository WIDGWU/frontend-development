"use client";
import { useState, useEffect } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllCourses, getCourseCategory } from "@/app/api/reports";
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
import {
  CourseTermFilter,
  CourseCollegeDescriptionFilter,
  DepartmentFilter,
  InstructorFilter,
} from "@/app/local-components/CoursePage/CourseFilter";
import { colleges } from "@/app/helpers/constants";
import { Loader } from "@/app/local-components/Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

interface Course {
  COURSE_ID: string;
  Course: string;
  Course_College_Desc: string;
  Course_Term_Code: string;
  Course_Number: string;
  Section_Number: string;
  Section_Credit_Hours: string;
  Instructor_netid: string;
  Instructor_Full_Name: string;
  Course_Status_Desc: string;
  Actual_Enrollment: string;
  CrossList_ID: string;
  Cross_List_Actual: string;
  CRN: string;
  Section_Title: string;
  Schedule_Type_Desc: string;
  Max_Enrollment: string;
  Variable_Credits: string;
  Section_Status_Desc: string;
  Seats_Available: string;
  Cross_List_Max: string;
  Course_Link_Identifier: string;
}

type CourseResponse = {
  results: Course[];
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
};

const Courses = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialPage = Number(searchParams.get("page") ?? "1") || 1;
  const initialPageSize = Number(searchParams.get("page_size") ?? "50") || 50;
  const initialSearch = searchParams.get("search") ?? "";
  const initialCourseTerm = searchParams.get("course_term_code") ?? null;
  const initialCourseCollegeDesc = searchParams.get("course_college_desc") ?? null;
  const initialCoursePrefix = searchParams.get("course_prefix") ?? null;
  const initialInstructor = searchParams.get("instructor_full_name") ?? null;

  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [totalCourseCount, setTotalCourseCount] = useState<number>(0);
  const [courseTerm, setCourseTerm] = useState<string[]>([]);
  const [selectedCourseTerm, setSelectedCourseTerm] = useState<string | null>(
    initialCourseTerm
  );
  const [
    selectedCourseCollegeDescription,
    setSelectedCourseCollegeDescription,
  ] = useState<string | null>(initialCourseCollegeDesc);
  const [courseNumberPrefix, setCourseNumberPrefix] = useState<string[]>([]);
  const [selectedCourseNumberPrefix, setSelectedCourseNumberPrefix] = useState<
    string | null
  >(initialCoursePrefix);
  const [instructor, setInstructor] = useState<string[]>([]);
  const [selectedInstructor, setSelectedInstructor] = useState<string | null>(
    initialInstructor
  );

  const [page, setPage] = useState<number>(initialPage);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [searchInput, setSearchInput] = useState<string>(initialSearch);
  const [search, setSearch] = useState<string>(initialSearch);
  const [sheetOpen, setSheetOpen] = useState(false);

  const clearFilters = () => {
    setSelectedCourseTerm(null);
    setSelectedCourseCollegeDescription(null);
    setSelectedCourseNumberPrefix(null);
    setSelectedInstructor(null);
  };

  // Fetch data from API using React Query
  const {
    data: courseCategoryDetails,
    isLoading: isCourseCategoryLoading,
    isError: isCourseCategoryError,
  } = useQuery({
    queryKey: ["courseCategoryDetails"],
    queryFn: getCourseCategory,
  });

  // Build filters object for API call
  // For course_college_desc, convert the college key to comma-separated aliases
  const getCollegeAliases = (collegeKey: string | null): string | null => {
    if (!collegeKey || !colleges[collegeKey]) return null;
    return colleges[collegeKey].aliases.join(",");
  };

  const filters = {
    ...(selectedCourseTerm ? { course_term_code: selectedCourseTerm } : {}),
    ...(selectedCourseCollegeDescription
      ? { course_college_desc: getCollegeAliases(selectedCourseCollegeDescription) }
      : {}),
    ...(selectedCourseNumberPrefix
      ? { course_prefix: selectedCourseNumberPrefix }
      : {}),
    ...(selectedInstructor
      ? { instructor_full_name: selectedInstructor }
      : {}),
  };

  const {
    data: courseDetails,
    isLoading: isCourseDetailsLoading,
    isError: isCourseDetailsError,
  } = useQuery<CourseResponse>({
    queryKey: [
      "courseDetails",
      page,
      pageSize,
      search,
      selectedCourseTerm,
      selectedCourseCollegeDescription,
      selectedCourseNumberPrefix,
      selectedInstructor,
    ],
    queryFn: () => getAllCourses(page, pageSize, search, filters),
    placeholderData: keepPreviousData,
  });

  // Sync category data into local state once loaded
  useEffect(() => {
    if (!courseCategoryDetails) return;
    setCourseTerm(courseCategoryDetails.Course_Term_Code);
    setCourseNumberPrefix(courseCategoryDetails.Course_Prefix);
    setInstructor(courseCategoryDetails.Instructor_Full_Name);
  }, [courseCategoryDetails]);

  // Sync course details into local state once loaded
  // Since filtering is now done server-side, filteredCourses is just the results
  useEffect(() => {
    if (!courseDetails) return;
    const pageResults = courseDetails.results || [];
    setFilteredCourses(pageResults);
    setTotalCourseCount(courseDetails.total ?? pageResults.length);
  }, [courseDetails]);

  const isLoading = isCourseCategoryLoading || isCourseDetailsLoading;
  const isError = isCourseCategoryError || isCourseDetailsError;

  const currentPage = courseDetails?.page ?? page;
  const totalPages = Math.max(1, courseDetails?.total_pages ?? 1);

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
  }, [
    search,
    pageSize,
    selectedCourseTerm,
    selectedCourseCollegeDescription,
    selectedCourseNumberPrefix,
    selectedInstructor,
  ]);

  // Sync pagination + search + filters state to the URL so results can be shared
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (page > 1) params.set("page", String(page));
    if (pageSize !== 50) params.set("page_size", String(pageSize));
    if (selectedCourseTerm) params.set("course_term_code", selectedCourseTerm);
    if (selectedCourseCollegeDescription)
      params.set("course_college_desc", selectedCourseCollegeDescription);
    if (selectedCourseNumberPrefix)
      params.set("course_prefix", selectedCourseNumberPrefix);
    if (selectedInstructor)
      params.set("instructor_full_name", selectedInstructor);

    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    router.replace(url, { scroll: false });
  }, [
    search,
    page,
    pageSize,
    selectedCourseTerm,
    selectedCourseCollegeDescription,
    selectedCourseNumberPrefix,
    selectedInstructor,
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
            There was a problem loading course data.
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
            {(selectedCourseTerm || selectedCourseCollegeDescription || selectedCourseNumberPrefix || selectedInstructor) && <Button onClick={clearFilters} className="">
              Clear all filters
            </Button>}

            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 bg-primary text-white hover:bg-primary/95 hover:text-light border-none"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
          </div>

          <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filter Courses</SheetTitle>
              <SheetDescription>
                Select filters to narrow down your search results
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6">
              <Accordion type="single" collapsible className="w-full">
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
                <AccordionItem value="course-college">
                  <AccordionTrigger>Course College</AccordionTrigger>
                  <AccordionContent>
                    <CourseCollegeDescriptionFilter
                      courseCollegeDescription={Object.keys(colleges)}
                      selectedCourseCollegeDescription={
                        selectedCourseCollegeDescription
                      }
                      setSelectedCourseCollegeDescription={
                        setSelectedCourseCollegeDescription
                      }
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="department">
                  <AccordionTrigger>Department</AccordionTrigger>
                  <AccordionContent>
                    <DepartmentFilter
                      department={courseNumberPrefix}
                      selectedDepartment={selectedCourseNumberPrefix}
                      setSelectedDepartment={setSelectedCourseNumberPrefix}
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="instructor">
                  <AccordionTrigger>Instructor</AccordionTrigger>
                  <AccordionContent>
                    <InstructorFilter
                      instructor={instructor}
                      selectedInstructor={selectedInstructor}
                      setSelectedInstructor={setSelectedInstructor}
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
            placeholder='Search (e.g., "MATH 101")'
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
          Showing {filteredCourses.length} on this page (Total: {totalCourseCount})
        </h4>
        <PaginationControls />
      </div>

      <div className="grid grid-rows gap-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex flex-row justify-between items-center w-full">
                      <div className="flex-1">
                        <span className="text-[14px] px-2 py-1 rounded-full bg-gray-200 mt-2">
                          {course.COURSE_ID}
                        </span>
                      </div>

                      <h1 className="flex-1 text-2xl font-semibold text-center">
                        {course.Course_Number}
                      </h1>

                      <h1 className="flex-1 text-xl text-end">
                        {course.Course_College_Desc}
                      </h1>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    <div className="flex flex-row gap-8">
                      <div className="flex-1">
                        <p className="text-left text-gray-600">
                          <span className="font-bold">Course Term Code : </span>{" "}
                          {course.Course_Term_Code
                            ? course.Course_Term_Code
                            : "N/A"}
                        </p>
                        <p className="text-left text-gray-600">
                          <span className="font-bold">Course : </span>
                          {course.Course ?? "N/A"}
                        </p>
                        <p className="text-left text-gray-600">
                          <span className="font-bold">Section Number : </span>
                          {course.Section_Number ?? "N/A"}
                        </p>

                        <p className="text-left text-gray-600">
                          <span className="font-bold">
                            Section Credit Hours :{" "}
                          </span>
                          {course.Section_Credit_Hours
                            ? course.Section_Credit_Hours
                            : "0"}
                        </p>
                        <p className="text-left text-gray-600">
                          <span className="font-bold">Instructor: </span>
                          {course.Instructor_Full_Name
                            ? course.Instructor_Full_Name +
                            " (" +
                            course.Instructor_netid +
                            ")"
                            : "N/A"}
                        </p>
                        <p className="text-left text-gray-600">
                          <span className="font-bold">
                            Course Status Description:
                          </span>
                          {course.Course_Status_Desc ?? "N/A"}
                        </p>
                        <p className="text-left text-gray-600">
                          <span className="font-bold">Actual Enrollment: </span>{" "}
                          {course.Actual_Enrollment ?? 0}
                        </p>

                        <p className="text-left text-gray-600">
                          <span className="font-bold">CrossList ID: </span>{" "}
                          {course.CrossList_ID ?? "N/A"}
                        </p>
                        <p className="text-left text-gray-600">
                          <span className="font-bold">CrossList Actual: </span>{" "}
                          {course.Cross_List_Actual ?? 0}
                        </p>
                      </div>
                      <div className="flex-1">
                        <p className="text-left text-gray-600">
                          <span className="font-bold">CRN : </span>
                          {course.CRN ?? "N/A"}
                        </p>
                        <p className="text-left text-gray-600">
                          <span className="font-bold">Section Title: </span>
                          {course.Section_Title ?? "N/A"}
                        </p>
                        <p className="text-left text-gray-600">
                          <span className="font-bold">
                            Schedule Type Description:{" "}
                          </span>
                          {course.Schedule_Type_Desc ?? "N/A"}
                        </p>
                        <p className="text-left text-gray-600">
                          <span className="font-bold">Maximum Enrollment: </span>
                          {course.Max_Enrollment ?? 0}
                        </p>
                        <p className="text-left text-gray-600">
                          <span className="font-bold">Variable Credits: </span>
                          {course.Variable_Credits ?? 0}
                        </p>
                        <p className="text-left text-gray-600">
                          <span className="font-bold">
                            Section Status Description:
                          </span>
                          {course.Section_Status_Desc
                            ? course.Section_Status_Desc
                            : "N/A"}
                        </p>

                        <p className="text-left text-gray-600">
                          <span className="font-bold">Seats Available: </span>
                          {course.Seats_Available ? course.Seats_Available : 0}
                        </p>
                        <p className="text-left text-gray-600">
                          <span className="font-bold">Cross List Maximum: </span>
                          {course.Cross_List_Max ?? 0}
                        </p>
                        <p className="text-left text-gray-600">
                          <span className="font-bold">
                            Course Link Identifier:
                          </span>
                          {course.Course_Link_Identifier ?? "N/A"}
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center text-4xl h-96">
            Sorry, No matching results were found.
          </div>
        )}
      </div>

      <div className="flex justify-end mt-6">
        <PaginationControls />
      </div>
    </main>
  );
};

export default Courses;
