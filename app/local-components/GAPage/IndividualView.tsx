import { useState, useEffect } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getGADetails, getGACategoryDetails } from "@/app/api/reports";
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
import PencilIcon from "@/assets/pencilIcon.png";
import TrashIcon from "@/assets/trashIcon.png";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { deleteGraduateAssistant } from "@/app/api/reports";
import { ToastContainer, toast } from "react-toastify";
import { Loader } from "@/app/local-components/Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

type GA = {
  COURSE_ID: string;
  CRN: string;
  Course_Term_Code: string;
  GA_First_Name: string;
  GA_Last_Name: string;
  GA_Net_ID: string;
  GA_Type: string;
  Home_Dept: string;
  Home_School: string;
  Hour_Assignment: string;
  Course_Number: string;
  Course_Dept?: string;
  Course_Actual_Enrollment?: number;
  Course_Max_Enrollment?: number;
  Course_Max_Enrollmen?: number;
};

type GAResponse = {
  results: GA[];
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
};

const IndividualView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialPage = Number(searchParams.get("page") ?? "1") || 1;
  const initialPageSize = Number(searchParams.get("page_size") ?? "50") || 50;
  const initialSearch = searchParams.get("search") ?? "";
  const initialGAType = searchParams.get("ga_type") ?? null;
  const initialHomeSchool = searchParams.get("home_school") ?? null;
  const initialHomeDept = searchParams.get("home_dept") ?? null;
  const initialCourseTermCode = searchParams.get("course_term_code") ?? null;
  const initialCoursePrefix = searchParams.get("course_prefix") ?? null;

  const [filteredGA, setFilteredGA] = useState<GA[]>([]);
  const [totalGACount, setTotalGACount] = useState<number>(0);
  const [gaType, setGAType] = useState<string[]>([]);
  const [selectedGAType, setSelectedGAType] = useState<string | null>(
    initialGAType
  );
  const [homeSchool, setHomeSchool] = useState<string[]>([]);
  const [selectedHomeSchool, setSelectedHomeSchool] = useState<string | null>(
    initialHomeSchool
  );
  const [homeDepartment, setHomeDepartment] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    initialHomeDept
  );
  const [courseTerm, setCourseTerm] = useState<string[]>([]);
  const [selectedCourseTerm, setSelectedCourseTerm] = useState<string | null>(
    initialCourseTermCode
  );
  const [courseDepartment, setCourseDepartment] = useState<string[]>([]);
  const [selectedCourseDepartment, setSelectedCourseDepartment] = useState<
    string | null
  >(initialCoursePrefix);

  const [page, setPage] = useState<number>(initialPage);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [searchInput, setSearchInput] = useState<string>(initialSearch);
  const [search, setSearch] = useState<string>(initialSearch);

  const [editModeCards, setEditModeCards] = useState<Set<number>>(new Set());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedGA, setSelectedGA] = useState<GA | null>(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );
  const [sheetOpen, setSheetOpen] = useState(false);

  const toggleEditMode = (index: number, g: GA) => {
    // If already in edit mode, show dialog
    if (editModeCards.has(index)) {
      setSelectedGA(g);
      setSelectedCardIndex(index); // Store the index of the selected card
      setDialogOpen(true);
    } else {
      // Toggle to edit mode
      setEditModeCards((prev) => {
        const newSet = new Set(prev);
        newSet.add(index);
        return newSet;
      });
    }
  };

  const handleDelete = () => {
    const formatDeleteGA = {
      GA_Net_ID: selectedGA?.GA_Net_ID,
      Course_Term_Code: selectedGA?.Course_Term_Code,
      CRN: selectedGA?.CRN,
    };
    console.log("Deleting GA:", formatDeleteGA);
    deleteGraduateAssistant(formatDeleteGA)
      .then((response) => {
        if (response.status === "success") {
          // Successfully deleted
          toast.success("Graduate Assistant deleted successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          // do hard refresh
          window.location.reload();

          // Close dialog and reset
          setDialogOpen(false);
          setSelectedGA(null);
          setSelectedCardIndex(null);

          setEditModeCards(new Set());
        }
      })
      .catch((error) => {
        // Handle error
        toast.error(error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error("Error deleting GA:", error);
      });
  };

  const handleCancel = () => {
    // Remove the selected card from edit mode
    if (selectedCardIndex !== null) {
      setEditModeCards((prev) => {
        const newSet = new Set(prev);
        newSet.delete(selectedCardIndex);
        return newSet;
      });
    }

    // Close dialog and reset states
    setDialogOpen(false);
    setSelectedGA(null);
    setSelectedCardIndex(null);
  };

  // Function to get initials of first name and last name
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  // Function to clear all filters
  const clearFilters = () => {
    setSelectedGAType(null);
    setSelectedHomeSchool(null);
    setSelectedDepartment(null);
    setSelectedCourseTerm(null);
    setSelectedCourseDepartment(null);
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
    ...(selectedHomeSchool ? { home_school: selectedHomeSchool } : {}),
    ...(selectedDepartment ? { home_dept: selectedDepartment } : {}),
    ...(selectedCourseTerm ? { course_term_code: selectedCourseTerm } : {}),
    ...(selectedCourseDepartment
      ? { course_prefix: selectedCourseDepartment }
      : {}),
  };

  const {
    data: gaDetails,
    isLoading: isGaDetailsLoading,
    isError: isGaDetailsError,
  } = useQuery<GAResponse>({
    queryKey: [
      "gaDetails",
      page,
      pageSize,
      search,
      selectedGAType,
      selectedHomeSchool,
      selectedDepartment,
      selectedCourseTerm,
      selectedCourseDepartment,
    ],
    queryFn: () => getGADetails(page, pageSize, search, filters),
    placeholderData: keepPreviousData,
  });

  // Sync category data into local state once loaded
  useEffect(() => {
    if (!gaCategoryDetails) return;
    setGAType(gaCategoryDetails.GA_Type);
    setHomeSchool(gaCategoryDetails.Home_School);
    setHomeDepartment(gaCategoryDetails.Home_Dept);
    setCourseTerm(gaCategoryDetails.Course_Term_Code);
    setCourseDepartment(gaCategoryDetails.Course_Prefix);
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
  }, [
    search,
    pageSize,
    selectedGAType,
    selectedHomeSchool,
    selectedDepartment,
    selectedCourseTerm,
    selectedCourseDepartment,
  ]);

  // Sync pagination + search + filters state to the URL so results can be shared
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (page > 1) params.set("page", String(page));
    if (pageSize !== 50) params.set("page_size", String(pageSize));
    if (selectedGAType) params.set("ga_type", selectedGAType);
    if (selectedHomeSchool) params.set("home_school", selectedHomeSchool);
    if (selectedDepartment) params.set("home_dept", selectedDepartment);
    if (selectedCourseTerm) params.set("course_term_code", selectedCourseTerm);
    if (selectedCourseDepartment)
      params.set("course_prefix", selectedCourseDepartment);

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

  // Filtering is now done server-side via API query parameters
  // No client-side filtering needed

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
        {/* <h4 className="text-xl font-semibold"ilters</h4> */}

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2 bg-primary text-white hover:bg-primary/95 hover:text-light">
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
              className="rounded-2xl bg-white p-4 shadow-md hover:shadow-lg transition-shadow duration-300 relative"
            >
              {/* Dynamic Icon - Toggles between Edit and Delete */}
              <div
                className={`absolute top-2 right-2 cursor-pointer p-1.5 rounded-full shadow-sm transition-all ${editModeCards.has(i)
                  ? "bg-red-500 border border-white hover:bg-red-600"
                  : "bg-white border border-gray-200 hover:bg-gray-100"
                  }`}
                onClick={() => toggleEditMode(i, g)} // Pass the GA object here
              >
                <Image
                  src={editModeCards.has(i) ? TrashIcon : PencilIcon}
                  alt={editModeCards.has(i) ? "Delete" : "Edit"}
                  width={20}
                  height={20}
                  className={`w-5 h-5 ${editModeCards.has(i)
                    ? "brightness-0 invert"
                    : "text-gray-500"
                    }`}
                />
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-white">
                  {getInitials(g.GA_First_Name, g.GA_Last_Name)}
                </div>

                <span className="text-[14px] px-2 py-1 rounded-full bg-gray-200 mt-2">
                  {g.GA_Net_ID}
                </span>
                <h1 className="text-2xl font-semibold my-4 text-center">
                  {g.GA_First_Name} {g.GA_Last_Name}
                </h1>
                <div>
                  <p className="text-left text-gray-600">
                    <span className="font-bold">GA Type : </span> {g.GA_Type}
                  </p>
                  <p className="text-left text-gray-600">
                    <span className="font-bold">Home Department : </span>
                    {g.Home_Dept}
                  </p>
                  <p className="text-left text-gray-600">
                    <span className="font-bold">Home School : </span>
                    {g.Home_School}
                  </p>
                  <p className="text-left text-gray-600">
                    <span className="font-bold">Assigned Hours : </span>
                    {g.Hour_Assignment ? g.Hour_Assignment : 0} hours
                  </p>
                  <p className="text-left text-gray-600">
                    <span className="font-bold">Course ID : </span>{" "}
                    {g.COURSE_ID}
                  </p>
                  <p className="text-left text-gray-600">
                    <span className="font-bold">Course Number : </span>{" "}
                    {g.Course_Number}
                  </p>
                  <p className="text-left text-gray-600">
                    <span className="font-bold">Enrollment : </span>{" "}
                    {g.Course_Actual_Enrollment ?? "—"} /{" "}
                    {g.Course_Max_Enrollment ?? g.Course_Max_Enrollmen ?? "—"}
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

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Confirm Deletion</DialogTitle>
            <DialogDescription className="text-center">
              Are you sure you want to delete this Graduate Assistant?
            </DialogDescription>
          </DialogHeader>

          {selectedGA && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex flex-col items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-white">
                  {getInitials(
                    selectedGA.GA_First_Name,
                    selectedGA.GA_Last_Name
                  )}
                </div>
                <h2 className="text-xl font-semibold mt-2">
                  {selectedGA.GA_First_Name} {selectedGA.GA_Last_Name}
                </h2>
              </div>

              <div className="grid gap-2">
                <p className="text-gray-600">
                  <span className="font-semibold">Net ID:</span>{" "}
                  {selectedGA.GA_Net_ID}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">GA Type:</span>{" "}
                  {selectedGA.GA_Type}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Department:</span>{" "}
                  {selectedGA.Home_Dept}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">School:</span>{" "}
                  {selectedGA.Home_School}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Hours:</span>{" "}
                  {selectedGA.Hour_Assignment}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Course ID:</span>{" "}
                  {selectedGA.COURSE_ID}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </main>
  );
};

export default IndividualView;
