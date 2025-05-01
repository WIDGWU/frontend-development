import React from "react";

const Page = () => {
  return (
    <main className="m-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Add Graduate Assistant Data
      </h1>
      <form className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="mb-4">
          <label htmlFor="file" className="block text-gray-700 mb-2">
            Upload File:
          </label>
          <input
            type="file"
            id="file"
            accept=".csv, .xlsx"
            className="border border-gray-300 rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 mb-2">
            Description:
          </label>
          <textarea
            id="description"
            rows={4}
            className="border border-gray-300 rounded p-2 w-full"
            placeholder="Enter a description of the file"
          ></textarea>
        </div>
      </form>
    </main>
  );
};

export default Page;
