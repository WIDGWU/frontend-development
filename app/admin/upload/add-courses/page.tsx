"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/components/ui/use-toast";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

const formSchema = z.object({
  courseName: z.string().min(1, {
    message: "Course name is required",
  }),
  courseDescription: z.string().min(1, {
    message: "Course description is required",
  }),
  courseDuration: z.string().min(1, {
    message: "Course duration is required",
  }),
});

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: "",
      courseDescription: "",
      courseDuration: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Handle form submission
    console.log(data);
    // You can send the data to your server or perform any other action here
  };

  return (
    <main className="m-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Add Courses Data</h1>

      <div className="w-full md:w-1/2 mx-auto bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="courseName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default Page;
