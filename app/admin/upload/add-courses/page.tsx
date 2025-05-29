"use client";

// import { Button } from "@/components/ui/button";
import FileUpload from "@/app/local-components/upload/fileUpload";

const Page = () => {
  return (
    <main className="m-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Add Courses Data</h1>

      <FileUpload />
    </main>
  );
};

export default Page;
