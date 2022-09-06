import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function PhotoUploadBtn({ setFiles, button }: any) {
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

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div className="cursor-pointer" {...getRootProps({})}>
      {button ? (
        <div className="w-full h-full">
          {button} <input {...getInputProps()} />
        </div>
      ) : (
        <label
          htmlFor="file-upload"
          className="relative w-full h-full font-medium bg-white rounded-md cursor-pointer dark:bg-transparent focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
        >
          {<span>Upload a file</span>}
          <input {...getInputProps()} />
        </label>
      )}
    </div>
  );
}
