"use client";

// import { Button } from "@/components/ui/button";
import FileUpload from "@/app/local-components/upload/fileUpload";

const Page = () => {
  return (
    <main className="m-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Add Courses Data</h1>

      {/* <div className="w-full md:w-1/2 mx-auto bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        File Upload Component
      </div> */}
      <FileUpload />
    </main>
  );
};

export default Page;
