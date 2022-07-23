import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  setFiles: (files: any) => void;
}

export default function PhotoDropzone({ setFiles }: Props) {
  const dzStyles = {
    border: "dashed 3px #eee",
    borderRadius: "5px",
    padding: "5px",
    textAlign: "center" as "center",
    height: "200px",
    width: "200px",
    margin: "0 auto",
    marginBottom: "10px",
    cursor: "pointer",
    backgroundColor: "#eee",
    color: "#aaa",
    fontSize: "20px",
    lineHeight: "200px",
    fontWeight: "bold",
  };

  const dzActive = {
    borderColor: "green",
  };

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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={isDragActive ? { ...dzStyles, ...dzActive } : { ...dzStyles }}
    >
      <input {...getInputProps()} />
      Drop image here or click to upload
    </div>
  );
}
