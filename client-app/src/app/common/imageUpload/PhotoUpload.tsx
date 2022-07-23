import React, { useEffect, useState } from "react";
import PhotoCropper from "./PhotoCropper";
import PhotoDropzone from "./PhotoDropzone";

interface Props {
  loading: boolean;
  uploadPhoto: (file: File) => void;
}

export default function PhotoUpload({ loading, uploadPhoto }: Props) {
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();

  function onCrop(e: any) {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob: any) => {
        uploadPhoto(blob);
      });
    }
  }

  useEffect(() => {
    return () => {
      files.forEach((file: any) => {
        URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);

  return (
    <div>
      <PhotoDropzone setFiles={setFiles} />
      <br />
      <br />
      <br />
      <br />
      {files && files.length > 0 && (
        <div>
          cropper
          <PhotoCropper
            setCropper={setCropper}
            imagePreview={files[0].preview}
          />
        </div>
      )}
      <br />
      <div>Cropped IMAGE PREVIEW</div>
      <div
        className="img-preview"
        style={{ minHeight: 200, overflow: "hidden" }}
      ></div>
      <button onClick={onCrop}>+ {loading && <div>loading</div>}</button>
      <button onClick={() => setFiles([])}>-</button>
    </div>
  );
}
