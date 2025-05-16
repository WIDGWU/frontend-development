import { useState, useEffect } from "react";
import { getGADetails, getGACategoryDetails } from "@/app/api/reports";
import {
  CourseTermFilter,
  GATypeFilter,
  HomeDepartmentFilter,
  HomeSchoolFilter,
  CourseDepartmentFilter,
} from "@/app/local-components/GAPage/GAFilter";
import { Button } from "@/components/ui/button";
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
import { deleteGraduateAssistant } from "@/app/api/reports";
import { ToastContainer, toast } from "react-toastify";

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
  Course_Dept: string;
};

const IndividualView = () => {
  const [ga, setGA] = useState<GA[]>([]);
  const [filteredGA, setFilteredGA] = useState<GA[]>([]);
  const [totalGACount, setTotalGACount] = useState<number>(0);
  const [gaType, setGAType] = useState<string[]>([]);
  const [selectedGAType, setSelectedGAType] = useState<string | null>(null);
  const [homeSchool, setHomeSchool] = useState<string[]>([]);
  const [selectedHomeSchool, setSelectedHomeSchool] = useState<string | null>(
    null
  );
  const [homeDepartment, setHomeDepartment] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [courseTerm, setCourseTerm] = useState<string[]>([]);
  const [selectedCourseTerm, setSelectedCourseTerm] = useState<string | null>(
    null
  );
  const [courseDepartment, setCourseDepartment] = useState<string[]>([]);
  const [selectedCourseDepartment, setSelectedCourseDepartment] = useState<
    string | null
  >(null);

  const [editModeCards, setEditModeCards] = useState<Set<number>>(new Set());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedGA, setSelectedGA] = useState<GA | null>(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );

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

  // Fetch data from API
  useEffect(() => {
    getGACategoryDetails().then((data) => {
      setGAType(data.GA_Type);
      setHomeSchool(data.Home_School);
      setHomeDepartment(data.Home_Dept);
      setCourseTerm(data.Course_Term_Code);
      setCourseDepartment(data.Course_Prefix);
    });
    getGADetails().then((data) => {
      setGA(data);
      setFilteredGA(data); // Initialize filteredGA with all data
      setTotalGACount(data.length);
    });
  }, []);

  // Filter data based on selected filters
  useEffect(() => {
    let filtered = ga;

    if (selectedGAType) {
      filtered = filtered.filter((g) => g.GA_Type === selectedGAType);
    }
    if (selectedHomeSchool) {
      filtered = filtered.filter((g) => g.Home_School === selectedHomeSchool);
    }
    if (selectedDepartment) {
      filtered = filtered.filter((g) => g.Home_Dept === selectedDepartment);
    }
    if (selectedCourseTerm) {
      filtered = filtered.filter(
        (g) => g.Course_Term_Code === selectedCourseTerm
      );
    }
    if (selectedCourseDepartment) {
      filtered = filtered.filter(
        (g) =>
          g.Course_Number &&
          g.Course_Number.split(" ")[0] === selectedCourseDepartment
      );
    }
    setFilteredGA(filtered);
  }, [
    selectedGAType,
    selectedHomeSchool,
    selectedDepartment,
    selectedCourseTerm,
    selectedCourseDepartment,
    ga,
  ]);
  return (
    <main className="m-4">
      <div className="flex items-center">
        <h4 className="text-xl font-semibold my-4 mr-4">Filter </h4>
      </div>
      <div className="flex items-center justify-space-between gap-4">
        <GATypeFilter
          gaType={gaType}
          selectedGAType={selectedGAType}
          setSelectedGAType={setSelectedGAType}
        />
        <HomeSchoolFilter
          homeschool={homeSchool}
          selectedHomeSchool={selectedHomeSchool}
          setSelectedHomeSchool={setSelectedHomeSchool}
        />
        <HomeDepartmentFilter
          homeDepartment={homeDepartment}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
        />
        <CourseTermFilter
          courseTerm={courseTerm}
          selectedCourseTerm={selectedCourseTerm}
          setSelectedCourseTerm={setSelectedCourseTerm}
        />
        <CourseDepartmentFilter
          courseDepartment={courseDepartment}
          selectedCourseDepartment={selectedCourseDepartment}
          setSelectedCourseDepartment={setSelectedCourseDepartment}
        />

        <Button onClick={clearFilters}> Clear all filters </Button>
      </div>

      <div className="flex items-center justify-between my-4">
        <h4 className="text-xl font-semibold">
          Total GA Count: {filteredGA.length} out of {totalGACount}
        </h4>
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
                className={`absolute top-2 right-2 cursor-pointer p-1.5 rounded-full shadow-sm transition-all ${
                  editModeCards.has(i)
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
                  className={`w-5 h-5 ${
                    editModeCards.has(i)
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
