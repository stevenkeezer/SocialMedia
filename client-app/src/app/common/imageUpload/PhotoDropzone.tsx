import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  setFiles: (files: any) => void;
  isDragged: any;
  setIsDragged: any;
}

export default function PhotoDropzone({
  setFiles,
  isDragged,
  setIsDragged,
}: Props) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
    [setFiles]
  );

  const { getRootProps } = useDropzone({ onDrop });

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <div
        {...getRootProps({
          onDrop: () => setIsDragged(false),
          onDragLeave: () => setIsDragged(false),
        })}
        className={classNames(
          isDragged ? "block" : "hidden",
          "w-full h-screen z-50 fixed top-0 mt-[8.2rem] max-w-[41.3rem]"
        )}
      >
        <div className="pointer-events-none bg-[#1e2021]/90 ">
          <div className="px-px py-px">
            <div className="h-[calc(100vh-19.25rem)]  flex justify-center m-5 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center flex flex-col justify-center items-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <p className="pl-1">Drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <label
    htmlFor="file-upload"
    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
  >
    <span>Upload a file</span>
    <input {...getInputProps()} />
  </label> */
}
