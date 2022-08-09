import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import PhotoCropper from "./PhotoCropper";
import PhotoDropzone from "./PhotoDropzone";

interface Props {
  loading: boolean;
  uploadPhoto: (file: File) => void;
  files: any;
  setFiles: any;
  cropperDisabled: boolean;
  hidePreview?: boolean;
}

export default observer(function PhotoUpload({
  loading,
  uploadPhoto,
  files,
  setFiles,
  cropperDisabled,
  hidePreview,
}: Props) {
  const [cropper, setCropper] = useState<Cropper>();

  function onCrop(e: any) {
    if (cropper && !cropperDisabled) {
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
      {/* <PhotoDropzone setFiles={setFiles} /> */}

      {files && files.length > 0 && !cropperDisabled && (
        <div>
          <PhotoCropper
            setCropper={setCropper}
            imagePreview={files[0].preview}
          />
          {!hidePreview && (
            <div
              className="img-preview"
              style={{ minHeight: 200, overflow: "hidden" }}
            >
              <div>Cropped IMAGE PREVIEW</div>
            </div>
          )}
          <div className="px-10 space-x-4">
            <button onClick={onCrop}>+ {loading && <div>loading</div>}</button>
            <button onClick={() => setFiles([])}>-</button>
          </div>
        </div>
      )}
    </div>
  );
});
