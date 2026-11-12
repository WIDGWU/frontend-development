import { useState, useEffect } from "react";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getGADetails,
  getGACategoryDetails,
  deleteGraduateAssistant,
  editGraduateAssistant,
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
import PencilIcon from "@/assets/pencilIcon.png";
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

type GADraft = {
  GA_First_Name: string;
  GA_Last_Name: string;
  GA_Type: string;
  Home_School: string;
  Home_Dept: string;
  Hour_Assignment: string;
  Course_Number: string;
  CRN: string;
  Course_Actual_Enrollment: string;
  Course_Max_Enrollment: string;
};

const toDraft = (g: GA): GADraft => {
  const maxEnrollment = g.Course_Max_Enrollment ?? g.Course_Max_Enrollmen;
  return {
    GA_First_Name: g.GA_First_Name ?? "",
    GA_Last_Name: g.GA_Last_Name ?? "",
    GA_Type: g.GA_Type ?? "",
    Home_School: g.Home_School ?? "",
    Home_Dept: g.Home_Dept ?? "",
    Hour_Assignment: g.Hour_Assignment ?? "",
    Course_Number: g.Course_Number ?? "",
    CRN: g.CRN == null ? "" : String(g.CRN),
    Course_Actual_Enrollment:
      g.Course_Actual_Enrollment == null
        ? ""
        : String(g.Course_Actual_Enrollment),
    Course_Max_Enrollment:
      maxEnrollment == null ? "" : String(maxEnrollment),
  };
};

const withCurrentOption = (options: string[], current: string) => {
  const unique = Array.from(new Set(options.filter(Boolean)));
  return current && !unique.includes(current) ? [current, ...unique] : unique;
};

const getApiErrorPayload = (error: unknown) => {
  if (
    typeof error !== "object" ||
    error === null ||
    !("response" in error) ||
    typeof error.response !== "object" ||
    error.response === null
  ) {
    return { status: undefined, data: undefined };
  }

  const response = error.response as { status?: number; data?: unknown };
  return { status: response.status, data: response.data };
};

const apiErrorMessage = (error: unknown, fallback: string) => {
  const { status, data } = getApiErrorPayload(error);

  if (typeof data === "string" && data.trim()) return data;
  if (typeof data === "object" && data !== null) {
    if ("message" in data && typeof data.message === "string" && data.message) {
      return data.message;
    }
    if ("detail" in data && typeof data.detail === "string" && data.detail) {
      return data.detail;
    }
    if ("error" in data && typeof data.error === "string" && data.error) {
      return data.error;
    }
  }

  if (status === 400) {
    return "Could not update this record. It may be missing required fields, or this Net ID has more than one assignment in the same term.";
  }

  return fallback;
};

const IndividualView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

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

  const [filteredGA, setFilteredGA] = useState<GA[]>([]);
  const [totalGACount, setTotalGACount] = useState<number>(0);
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

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedGA, setSelectedGA] = useState<GA | null>(null);
  const [draft, setDraft] = useState<GADraft | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const openDetails = (g: GA) => {
    setSelectedGA(g);
    setDraft(toDraft(g));
    setEditing(false);
    setSaving(false);
    setConfirmingDelete(false);
    setDialogOpen(true);
  };

  const closeDetails = () => {
    setDialogOpen(false);
    setSelectedGA(null);
    setDraft(null);
    setEditing(false);
    setSaving(false);
    setConfirmingDelete(false);
  };

  const updateDraft = (field: keyof GADraft, value: string) => {
    setDraft((current) => (current ? { ...current, [field]: value } : current));
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

          closeDetails();
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

  const handleSave = () => {
    if (!selectedGA || !draft || saving) return;

    // Identity only: Net ID + term. CRN is editable and omitted unless changed.
    const payload: Record<string, string | number> = {
      GA_Net_ID: selectedGA.GA_Net_ID,
      Course_Term_Code: selectedGA.Course_Term_Code,
    };

    const assignText = (
      key:
        | "GA_First_Name"
        | "GA_Last_Name"
        | "GA_Type"
        | "Home_School"
        | "Home_Dept"
        | "Hour_Assignment"
        | "Course_Number"
        | "CRN",
      original: string | number | null | undefined
    ) => {
      const next = draft[key].trim();
      if (next !== String(original ?? "").trim()) payload[key] = next;
    };

    assignText("GA_First_Name", selectedGA.GA_First_Name);
    assignText("GA_Last_Name", selectedGA.GA_Last_Name);
    assignText("GA_Type", selectedGA.GA_Type);
    assignText("Home_School", selectedGA.Home_School);
    assignText("Home_Dept", selectedGA.Home_Dept);
    assignText("Hour_Assignment", selectedGA.Hour_Assignment);
    assignText("Course_Number", selectedGA.Course_Number);
    assignText("CRN", selectedGA.CRN);

    const assignNumber = (
      key: "Course_Actual_Enrollment" | "Course_Max_Enrollment",
      raw: string,
      original: number | undefined,
      label: string
    ) => {
      const trimmed = raw.trim();
      if (trimmed === "") {
        if (original == null) return true;
        toast.error(`${label} needs a number.`);
        return false;
      }
      const value = Number(trimmed);
      if (!Number.isFinite(value)) {
        toast.error(`${label} needs a number.`);
        return false;
      }
      if (original == null || value !== Number(original)) {
        payload[key] = value;
      }
      return true;
    };

    const actualOk = assignNumber(
      "Course_Actual_Enrollment",
      draft.Course_Actual_Enrollment,
      selectedGA.Course_Actual_Enrollment,
      "Actual enrollment"
    );
    if (!actualOk) return;

    const maxOk = assignNumber(
      "Course_Max_Enrollment",
      draft.Course_Max_Enrollment,
      selectedGA.Course_Max_Enrollment ?? selectedGA.Course_Max_Enrollmen,
      "Max enrollment"
    );
    if (!maxOk) return;

    if (Object.keys(payload).length === 2) {
      toast.info("No changes to save.");
      setEditing(false);
      return;
    }

    setSaving(true);
    editGraduateAssistant(payload)
      .then((response) => {
        if (response.status !== "success") {
          toast.error(
            response.message || "Could not update this graduate assistant."
          );
          return;
        }

        toast.success(
          response.message || "Graduate assistant updated successfully",
          {
            position: "top-right",
            autoClose: 2000,
          }
        );

        const nextCRN = draft.CRN.trim();
        const nextGA: GA = {
          ...selectedGA,
          GA_First_Name: draft.GA_First_Name.trim(),
          GA_Last_Name: draft.GA_Last_Name.trim(),
          GA_Type: draft.GA_Type.trim(),
          Home_School: draft.Home_School.trim(),
          Home_Dept: draft.Home_Dept.trim(),
          Hour_Assignment: draft.Hour_Assignment.trim(),
          Course_Number: draft.Course_Number.trim(),
          CRN: nextCRN,
          // Backend rebuilds COURSE_ID as {Course_Term_Code}_{CRN}
          COURSE_ID: `${selectedGA.Course_Term_Code}_${nextCRN}`,
          Course_Actual_Enrollment:
            draft.Course_Actual_Enrollment.trim() === ""
              ? selectedGA.Course_Actual_Enrollment
              : Number(draft.Course_Actual_Enrollment),
          Course_Max_Enrollment:
            draft.Course_Max_Enrollment.trim() === ""
              ? selectedGA.Course_Max_Enrollment
              : Number(draft.Course_Max_Enrollment),
        };
        setSelectedGA(nextGA);
        setDraft(toDraft(nextGA));
        setEditing(false);
        queryClient.invalidateQueries({ queryKey: ["gaDetails"] });
      })
      .catch((error) => {
        toast.error(
          apiErrorMessage(error, "Could not update this graduate assistant.")
        );
      })
      .finally(() => setSaving(false));
  };

  // Function to get initials of first name and last name
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  // Function to clear all filters
  const clearFilters = () => {
    setSelectedGAType([]);
    setSelectedHomeSchool([]);
    setSelectedDepartment([]);
    setSelectedCourseTerm([]);
    setSelectedCourseDepartment([]);
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

  // Build filters object for API call (comma-separated strings for multi-value params)
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

  const hasActiveFilters =
    selectedGAType.length > 0 ||
    selectedHomeSchool.length > 0 ||
    selectedDepartment.length > 0 ||
    selectedCourseTerm.length > 0 ||
    selectedCourseDepartment.length > 0;

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
              <div
                className="absolute top-2 right-2 cursor-pointer p-1.5 rounded-full shadow-sm transition-all bg-white border border-gray-200 hover:bg-gray-100"
                onClick={() => openDetails(g)}
              >
                <Image
                  src={PencilIcon}
                  alt="View details"
                  width={20}
                  height={20}
                  className="w-5 h-5 text-gray-500"
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

      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          if (!open) closeDetails();
        }}
      >
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Graduate Assistant details</DialogTitle>
            <DialogDescription>
              Full assignment record for this course.
            </DialogDescription>
          </DialogHeader>

          {selectedGA && draft && (
            <div className="space-y-4">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-white">
                  {getInitials(
                    draft.GA_First_Name || selectedGA.GA_First_Name,
                    draft.GA_Last_Name || selectedGA.GA_Last_Name
                  )}
                </div>
                <h2 className="text-xl font-semibold mt-2 text-center">
                  {draft.GA_First_Name} {draft.GA_Last_Name}
                </h2>
                <span className="text-sm px-2 py-1 rounded-full bg-gray-200 mt-2">
                  {selectedGA.GA_Net_ID}
                </span>
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 border-t border-gray-200 pt-4">
                {[
                  { label: "Net ID", value: selectedGA.GA_Net_ID },
                  { label: "Course Term", value: selectedGA.Course_Term_Code },
                  { label: "Course ID", value: selectedGA.COURSE_ID },
                  { label: "Course Department", value: selectedGA.Course_Dept },
                ].map((field) => (
                  <div key={field.label}>
                    <dt className="text-sm font-semibold text-gray-900">
                      {field.label}
                    </dt>
                    <dd className="text-sm text-gray-600">
                      {field.value || "—"}
                    </dd>
                  </div>
                ))}
              </dl>

              {editing ? (
                <div className="space-y-4 border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600">
                    First and last name update every assignment for this Net
                    ID. The other fields, including CRN, update only this
                    course. Net ID and course term identify the row and cannot
                    be changed. Course ID is rebuilt from term and CRN.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="space-y-1">
                      <span className="text-sm font-semibold text-gray-900">
                        First name
                      </span>
                      <Input
                        value={draft.GA_First_Name}
                        onChange={(e) =>
                          updateDraft("GA_First_Name", e.target.value)
                        }
                      />
                    </label>
                    <label className="space-y-1">
                      <span className="text-sm font-semibold text-gray-900">
                        Last name
                      </span>
                      <Input
                        value={draft.GA_Last_Name}
                        onChange={(e) =>
                          updateDraft("GA_Last_Name", e.target.value)
                        }
                      />
                    </label>
                    <label className="space-y-1">
                      <span className="text-sm font-semibold text-gray-900">
                        GA Type
                      </span>
                      <Select
                        value={draft.GA_Type || undefined}
                        onValueChange={(value) => updateDraft("GA_Type", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select GA type" />
                        </SelectTrigger>
                        <SelectContent className="z-[60]">
                          {withCurrentOption(gaType, draft.GA_Type).map(
                            (type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </label>
                    <label className="space-y-1">
                      <span className="text-sm font-semibold text-gray-900">
                        Home School
                      </span>
                      <Select
                        value={draft.Home_School || undefined}
                        onValueChange={(value) =>
                          updateDraft("Home_School", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select home school" />
                        </SelectTrigger>
                        <SelectContent className="z-[60]">
                          {withCurrentOption(homeSchool, draft.Home_School).map(
                            (school) => (
                              <SelectItem key={school} value={school}>
                                {school}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </label>
                    <label className="space-y-1">
                      <span className="text-sm font-semibold text-gray-900">
                        Home Department
                      </span>
                      <Input
                        value={draft.Home_Dept}
                        onChange={(e) =>
                          updateDraft("Home_Dept", e.target.value)
                        }
                      />
                    </label>
                    <label className="space-y-1">
                      <span className="text-sm font-semibold text-gray-900">
                        Assigned Hours
                      </span>
                      <Input
                        value={draft.Hour_Assignment}
                        onChange={(e) =>
                          updateDraft("Hour_Assignment", e.target.value)
                        }
                      />
                    </label>
                    <label className="space-y-1">
                      <span className="text-sm font-semibold text-gray-900">
                        CRN
                      </span>
                      <Input
                        value={draft.CRN}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /\D/g,
                            ""
                          );
                          updateDraft("CRN", numericValue);
                        }}
                        inputMode="numeric"
                        pattern="[0-9]*"
                      />
                    </label>
                    <label className="space-y-1">
                      <span className="text-sm font-semibold text-gray-900">
                        Course Number
                      </span>
                      <Input
                        value={draft.Course_Number}
                        onChange={(e) =>
                          updateDraft("Course_Number", e.target.value)
                        }
                      />
                    </label>
                    <label className="space-y-1">
                      <span className="text-sm font-semibold text-gray-900">
                        Actual Enrollment
                      </span>
                      <Input
                        type="number"
                        value={draft.Course_Actual_Enrollment}
                        onChange={(e) =>
                          updateDraft(
                            "Course_Actual_Enrollment",
                            e.target.value
                          )
                        }
                      />
                    </label>
                    <label className="space-y-1">
                      <span className="text-sm font-semibold text-gray-900">
                        Max Enrollment
                      </span>
                      <Input
                        type="number"
                        value={draft.Course_Max_Enrollment}
                        onChange={(e) =>
                          updateDraft("Course_Max_Enrollment", e.target.value)
                        }
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 border-t border-gray-200 pt-4">
                  {[
                    { label: "First Name", value: selectedGA.GA_First_Name },
                    { label: "Last Name", value: selectedGA.GA_Last_Name },
                    { label: "GA Type", value: selectedGA.GA_Type },
                    { label: "Home Department", value: selectedGA.Home_Dept },
                    { label: "Home School", value: selectedGA.Home_School },
                    {
                      label: "Assigned Hours",
                      value: selectedGA.Hour_Assignment
                        ? `${selectedGA.Hour_Assignment} hours`
                        : "0 hours",
                    },
                    { label: "CRN", value: selectedGA.CRN },
                    { label: "Course Number", value: selectedGA.Course_Number },
                    {
                      label: "Enrollment",
                      value: `${selectedGA.Course_Actual_Enrollment ?? "—"} / ${
                        selectedGA.Course_Max_Enrollment ??
                        selectedGA.Course_Max_Enrollmen ??
                        "—"
                      }`,
                    },
                  ].map((field) => (
                    <div key={field.label}>
                      <dt className="text-sm font-semibold text-gray-900">
                        {field.label}
                      </dt>
                      <dd className="text-sm text-gray-600">
                        {field.value || "—"}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className="border-t border-gray-200 pt-4">
                {editing ? (
                  <div className="flex justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setDraft(toDraft(selectedGA));
                        setEditing(false);
                      }}
                      disabled={saving}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={saving}>
                      {saving ? "Saving..." : "Save"}
                    </Button>
                  </div>
                ) : confirmingDelete ? (
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-gray-600">
                      Delete this graduate assistant from this course?
                    </p>
                    <div className="flex justify-end gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setConfirmingDelete(false)}
                      >
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleDelete}>
                        Delete
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setDraft(toDraft(selectedGA));
                        setConfirmingDelete(false);
                        setEditing(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => setConfirmingDelete(true)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </main>
  );
};

export default IndividualView;
