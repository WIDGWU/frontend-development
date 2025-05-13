"use client";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CalendarIcon from "@/assets/calendar-icon.png";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { addCourseApprovals } from "@/app/api/reports";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";

const formSchema = z.object({
  Course_Number: z.string().min(1, "Course Number is required"),
  Course_Title: z.string().min(1, "Course Title is required"),
  Last_Approved_Date: z.date().optional(),
  Last_Edit_Date: z.date().optional(),
  Long_Course_Title: z.string().min(1, "Long Course Title is required"),
  Short_Course_Title: z.string().min(1, "Short Course Title is required"),
  Effective_Term: z.string(),
  Comments: z.string(),
  Reviewer_Comments: z.string(),
  Status_Head: z.string(),
  University_general_education: z.string(),
  CCAS_general_education: z.string(),
  Honors: z.string(),
  Elliott_School_of_International_Affairs: z.string(),
  Other: z.string(),
});

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Course_Number: "",
      Course_Title: "",
      Last_Approved_Date: undefined,
      Last_Edit_Date: undefined,
      Long_Course_Title: "",
      Short_Course_Title: "",
      Effective_Term: "",
      Comments: "",
      Reviewer_Comments: "",
      Status_Head: "",
      University_general_education: "",
      CCAS_general_education: "",
      Honors: "",
      Elliott_School_of_International_Affairs: "",
      Other: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formattedData = {
      ...data,

      Last_Approved_Date: data.Last_Approved_Date
        ? format(data.Last_Approved_Date, "yyyy-MM-dd HH:mm:ss")
        : "",
      Last_Edit_Date: data.Last_Edit_Date
        ? format(data.Last_Edit_Date, "yyyy-MM-dd HH:mm:ss")
        : "",
    };

    // console.log("Form data:", formattedData);

    addCourseApprovals(formattedData)
      .then((response) => {
        if (response.status === "success") {
          toast.success("Successfully added Course Approval", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          form.reset();
        } else {
          toast.error("Error adding Course Approval", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <main className="m-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Approve Courses</h1>

      <div className="w-full md:w-1/2 mx-auto bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="Course_Number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Number</FormLabel>
                  <FormControl>
                    <Input placeholder="AMST 101" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Course_Title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Special Topics" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Last_Approved_Date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Last Approved Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={`w-full pl-3 text-left font-normal ${
                            !field.value ? "text-muted-foreground" : ""
                          }`}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select date</span>
                          )}
                          <div>
                            <Image
                              src={CalendarIcon}
                              alt="Calendar"
                              className="ml-auto h-4 w-4 opacity-50"
                            />
                          </div>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Last_Edit_Date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Last Edit Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={`w-full pl-3 text-left font-normal ${
                            !field.value ? "text-muted-foreground" : ""
                          }`}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select date</span>
                          )}
                          <div>
                            <Image
                              src={CalendarIcon}
                              alt="Calendar"
                              className="ml-auto h-4 w-4 opacity-50"
                            />
                          </div>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Long_Course_Title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Long Course Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Special Topics" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Short_Course_Title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Course Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Special Topics" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Effective_Term"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Effective Term</FormLabel>
                  <FormControl>
                    <Input placeholder="202401" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comments</FormLabel>
                  <FormControl>
                    <Input placeholder="Requesting" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Reviewer_Comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reviewer Comments</FormLabel>
                  <FormControl>
                    <Input placeholder="Looks good" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Status_Head"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status Head</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Course Activation proposal"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="University_general_education"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>University General Education</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="University General Education"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="CCAS_general_education"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CCAS General Education</FormLabel>
                  <FormControl>
                    <Input placeholder="CCOM" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Honors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Honors</FormLabel>
                  <FormControl>
                    <Input placeholder="Honors" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Elliott_School_of_International_Affairs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Elliot School of International Affairs</FormLabel>
                  <FormControl>
                    <Input placeholder="ESIC Humanities" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Other"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other</FormLabel>
                  <FormControl>
                    <Input placeholder="Other" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="w-full p-4" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <ToastContainer />
    </main>
  );
};

export default Page;
