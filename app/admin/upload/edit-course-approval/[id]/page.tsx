"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
import {
  getCourseApprovalById,
  updateCourseApprovals,
} from "@/app/api/reports";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";

const formSchema = z.object({
  Course_Number: z.string().min(1, "Course Number is required"),
  Course_Title: z.string().min(1, "Course Title is required"),
  Last_Approved_Date: z.date({
    required_error: "Last Approved Date is required",
  }),
  Last_Edit_Date: z.date({
    required_error: "Last Edit Date is required",
  }),
  Long_Course_Title: z.string().min(1, "Long Course Title is required"),
  Short_Course_Title: z.string().min(1, "Short Course Title is required"),

  // Effective_Term: z.string().optional(),
  // Comments: z.string().optional(),
  // Reviewer_Comments: z.string().optional(),
  // Status_Head: z.string().optional(),
  // University_general_education: z.string().optional(),
  // CCAS_general_education: z.string().optional(),
  // Honors: z.string().optional(),
  // Elliott_School_of_International_Affairs: z.string().optional(),
  // Other: z.string().optional(),
  Effective_Term: z.string().nullable().optional(),
  Comments: z.string().nullable().optional(),
  Reviewer_Comments: z.string().nullable().optional(),
  Status_Head: z.string().nullable().optional(),
  University_general_education: z.string().nullable().optional(),
  CCAS_general_education: z.string().nullable().optional(),
  Honors: z.string().nullable().optional(),
  Elliott_School_of_International_Affairs: z.string().nullable().optional(),
  Other: z.string().nullable().optional(),
});

const Page = () => {
  const params = useParams();
  const id = decodeURIComponent(params.id as string);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Course_Number: "",
      Course_Title: "",
      Last_Approved_Date: undefined,
      Last_Edit_Date: undefined,
      Long_Course_Title: "",
      Short_Course_Title: "",

      // Optional fields with default values
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
      // Required fields
      Course_Number: data.Course_Number,
      Course_Title: data.Course_Title,
      Long_Course_Title: data.Long_Course_Title,
      Short_Course_Title: data.Short_Course_Title,

      // Optional fields with fallback values
      Effective_Term: data?.Effective_Term || "N/A",
      Comments: data?.Comments || "N/A",
      Reviewer_Comments: data?.Reviewer_Comments || "N/A",
      Status_Head: data?.Status_Head || "N/A",
      University_general_education: data?.University_general_education || "N/A",
      CCAS_general_education: data?.CCAS_general_education || "N/A",
      Honors: data?.Honors || "N/A",
      Elliott_School_of_International_Affairs:
        data?.Elliott_School_of_International_Affairs || "N/A",
      Other: data?.Other || "N/A",

      // Date fields
      Last_Approved_Date: data.Last_Approved_Date
        ? format(data.Last_Approved_Date, "yyyy-MM-dd")
        : "",
      Last_Edit_Date: data.Last_Edit_Date
        ? format(data.Last_Edit_Date, "yyyy-MM-dd")
        : "",
    };

    updateCourseApprovals(formattedData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Successfully updated Course Approval", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            router.push("/admin/course-approval");
            form.reset();
          }, 2000);
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

  useEffect(() => {
    getCourseApprovalById(id)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          const data = response.data;
          form.reset({
            Course_Number: data.Course_Number,
            Course_Title: data.Course_Title,
            Last_Approved_Date: new Date(data.Last_Approved_Date),
            Last_Edit_Date: new Date(data.Last_Edit_Date),
            Long_Course_Title: data.Long_Course_Title,
            Short_Course_Title: data.Short_Course_Title,
            Effective_Term: data.Effective_Term,
            Comments: data.Comments,
            Reviewer_Comments: data.Reviewer_Comments,
            Status_Head: data.Status_Head,
            University_general_education: data.University_general_education,
            CCAS_general_education: data.CCAS_general_education,
            Honors: data.Honors,
            Elliott_School_of_International_Affairs:
              data.Elliott_School_of_International_Affairs,
            Other: data.Other,
          });
        } else {
          toast.error("Error fetching Course Approval", {
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
  }, [id]);

  return (
    <main className="m-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Edit Approved Courses : {id}
      </h1>

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
                    <Input
                      placeholder="AMST 101"
                      {...field}
                      readOnly
                      className="bg-gray-100 cursor-not-allowed border-gray-300"
                    />
                  </FormControl>
                  <p className="text-xs text-muted-foreground mt-1">
                    Course Number cannot be changed
                  </p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Course_Title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Course Title<span className="text-red-500">*</span>
                  </FormLabel>
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
                  <FormLabel>
                    Last WID Approved Date{" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
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
                  <FormLabel>
                    Last Edit Date <span className="text-red-500">*</span>
                  </FormLabel>
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
                  <FormLabel>
                    Long Course Title <span className="text-red-500">*</span>
                  </FormLabel>
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
                  <FormLabel>
                    Short Course Title <span className="text-red-500">*</span>
                  </FormLabel>
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
                    <Input
                      placeholder="202401"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Comments"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Comments</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      placeholder="Requesting"
                      className={fieldState.invalid ? "border-red-500" : ""}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-sm text-red-600">
                      {fieldState.error.message}
                    </p>
                  )}
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
                    <Input
                      placeholder="Looks good"
                      {...field}
                      value={field.value ?? ""}
                    />
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
                      value={field.value ?? ""}
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
                      value={field.value ?? ""}
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
                    <Input
                      placeholder="CCOM"
                      {...field}
                      value={field.value ?? ""}
                    />
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
                    <Input
                      placeholder="Honors"
                      {...field}
                      value={field.value ?? ""}
                    />
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
                    <Input
                      placeholder="ESIC Humanities"
                      {...field}
                      value={field.value ?? ""}
                    />
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
                    <Input
                      placeholder="Other"
                      {...field}
                      value={field.value ?? ""}
                    />
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
