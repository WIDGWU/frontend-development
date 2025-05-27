import React from "react";
import { useState, useRef, ChangeEvent, DragEvent } from "react";
import Image from "next/image";
import UploadIcon from "@/assets/uploadIcon.png";
import ExcelIcon from "@/assets/excelIcon.png";
import { uploadCourses } from "@/app/api/reports";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const acceptedFileExtensions = ["xlsx", "xls"];

  const acceptedFileTypesString = acceptedFileExtensions
    .map((ext) => `.${ext}`)
    .join(",");

  const handleSubmit = () => {
    if (!selectedFile) {
      setError("File is required");
      return;
    }

    if (error || isUploading) {
      return;
    }

    setIsUploading(true);

    // FormData for single file
    const formData = new FormData();
    formData.append("file", selectedFile);

    uploadCourses(formData)
      .then((response) => {
        console.log("File uploaded successfully:", response);

        toast.success(response.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setSelectedFile(null);
        setError("");
      })
      .catch((error) => {
        console.error("Error uploading file:", error.response.data.message);
        setError(error.response.data.message);
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
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      processFile(event.target.files[0]);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files.length > 0) {
      processFile(event.dataTransfer.files[0]);
    }
  };

  const processFile = (file: File) => {
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";

    if (!acceptedFileExtensions.includes(fileExtension)) {
      setError(`Only ${acceptedFileExtensions.join(", ")} files are allowed`);
      return;
    }

    if (!file.name.includes("WID")) {
      setError(`File name must be unique`);
      return;
    }

    setSelectedFile(file);
    setError("");
  };

  const handleCustomButtonClick = () => {
    if (isUploading) {
      toast.info("Please wait until current upload completes", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileDelete = () => {
    setSelectedFile(null);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-5xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Upload File</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`min-h-[23rem] border-4 border-dashed ${
              isUploading
                ? "border-gray-400 bg-gray-100"
                : "border-blue-500 bg-blue-100"
            } rounded-3xl p-4 flex flex-col justify-center items-center space-y-4`}
            onDragOver={(e) => {
              e.preventDefault();
              if (!isUploading) e.dataTransfer.dropEffect = "copy";
            }}
            onDrop={(e) => !isUploading && handleDrop(e)}
          >
            <Image
              src={UploadIcon}
              alt="Upload Icon"
              className={`w-24 h-24 mb-2 ${isUploading ? "opacity-50" : ""}`}
            />
            <p className="text-lg font-semibold">
              {isUploading ? "Uploading..." : "Drag and Drop a file"}
            </p>
            <p className="text-lg font-bold">or</p>
            <button
              type="button"
              onClick={handleCustomButtonClick}
              disabled={isUploading}
              className={`px-4 py-2 ${
                isUploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white rounded-lg focus:outline-none`}
            >
              {isUploading ? "Uploading..." : "Select File"}
            </button>
            <input
              type="file"
              id="files"
              name="files"
              accept={acceptedFileTypesString}
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              disabled={isUploading}
              onClick={(event) => {
                (event.target as HTMLInputElement).value = "";
              }}
            />
          </div>

          <div className="border-2 border-gray-300 rounded-3xl py-4 max-h-[23rem] overflow-auto">
            {selectedFile ? (
              <ul className="px-4">
                <li className="flex justify-between items-center border-b py-2">
                  <div className="flex items-center">
                    <Image
                      src={ExcelIcon}
                      alt="File Icon"
                      className="w-8 h-8 mr-2"
                    />
                    <span className="text-base">{selectedFile.name}</span>
                  </div>
                  {!isUploading && (
                    <button
                      type="button"
                      onClick={handleFileDelete}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                      disabled={isUploading}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="w-6 h-6"
                      >
                        <path
                          stroke="currentColor"
                          strokeWidth="2"
                          d="M6 4l8 8M14 4l-8 8"
                        />
                      </svg>
                    </button>
                  )}
                </li>
              </ul>
            ) : (
              <div className="h-full flex justify-center items-center">
                <p className="text-lg font-semibold text-gray-500 text-center">
                  No File Selected
                </p>
              </div>
            )}
          </div>
        </div>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedFile || isUploading || !!error}
            className={`px-6 py-2 ${
              !selectedFile || isUploading || !!error
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white rounded-lg focus:outline-none`}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FileUpload;
