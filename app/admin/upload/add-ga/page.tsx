"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getGACategoryDetails, addGraduateAssistant } from "@/app/api/reports";

const formSchema = z.object({
  Course_Term_Code: z
    .string()
    .regex(/^\d+$/, {
      message: "Course Term Code must contain only numbers",
    })
    .min(1, {
      message: "Course Term Code is required",
    }),
  CRN: z
    .string()
    .regex(/^\d+$/, {
      message: "CRN must contain only numbers",
    })
    .min(1, {
      message: "CRN is required",
    }),
  GA_Net_ID: z.string().min(1, {
    message: "GA Net ID is required",
  }),
  GA_Type: z.string().min(1, {
    message: "GA Type is required",
  }),
  GA_First_Name: z.string().min(1, {
    message: "GA First Name is required",
  }),
  GA_Last_Name: z.string().min(1, {
    message: "GA Last Name is required",
  }),
  Home_School: z.string().min(1, {
    message: "Home School is required",
  }),
  Home_Dept: z.string().min(1, {
    message: "Home Department is required",
  }),
  Hour_Assignment: z.string().min(1, {
    message: "Assigned Hours are required",
  }),
});

const Page = () => {
  const [gaType, setGAType] = useState([]);
  const [homeSchool, setHomeSchool] = useState([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Course_Term_Code: "",
      CRN: "",
      GA_Net_ID: "",
      GA_Type: "",
      GA_First_Name: "",
      GA_Last_Name: "",
      Home_School: "",
      Home_Dept: "",
      Hour_Assignment: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // console.log("Form Data:", data);
    addGraduateAssistant(data)
      .then((response) => {
        if (response.status === "success") {
          toast.success("Successfully added Graduate Assistant", {
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
          toast.error("Error adding Graduate Assistant", {
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
        console.error(
          "Error adding Graduate Assistant:",
          error.response.data.message
        );
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
    getGACategoryDetails().then((data) => {
      setGAType(data.GA_Type);
      setHomeSchool(data.Home_School);
    });
  }, []);

  return (
    <main className="m-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Add Graduate Assistants
      </h1>

      <div className="w-full md:w-1/2 mx-auto bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="Course_Term_Code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Course Term Code <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="202401"
                      {...field}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(/\D/g, "");
                        field.onChange(numericValue);
                      }}
                      inputMode="numeric"
                      pattern="[0-9]*"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="CRN"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    CRN <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="96623"
                      {...field}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(/\D/g, "");
                        field.onChange(numericValue);
                      }}
                      inputMode="numeric"
                      pattern="[0-9]*"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="GA_Net_ID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    GA Net ID <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="aaronameek" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="GA_Type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    GA Type <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select GA Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {gaType.map((type, index) => (
                        <SelectItem key={index} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="GA_First_Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    GA First Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Garrett" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="GA_Last_Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    GA Last Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Johnson" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Home_School"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Home School <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Home School" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {homeSchool.map((school, index) => (
                        <SelectItem key={index} value={school}>
                          {school}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Home_Dept"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Home Department <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="CCAS" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Hour_Assignment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Assigned Hours <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="20.0" {...field} />
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
