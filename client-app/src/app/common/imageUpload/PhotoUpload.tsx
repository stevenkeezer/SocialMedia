import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import PhotoCropper from "./PhotoCropper";
import PhotoDropzone from "./PhotoDropzone";

interface Props {
  loading: boolean;
  uploadPhoto: (file: File) => void;
}

export default observer(function PhotoUpload({ loading, uploadPhoto }: Props) {
  const [files, setFiles] = useState<any>([]);

  const [cropper, setCropper] = useState<Cropper>();
  const [progressWidth, setProgressWidth] = useState<number>(0);

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

  useEffect(() => {
    if (!loading) setProgressWidth(0);

    if (loading) {
      setTimeout(() => {
        setProgressWidth(100);
      }, 600);
    }
  }, [loading]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div>
      <PhotoDropzone setFiles={setFiles} />

      {files && files.length > 0 && (
        <div>
          cropper
          <PhotoCropper
            setCropper={setCropper}
            imagePreview={files[0].preview}
          />
        </div>
      )}

      <div
        className="img-preview"
        style={{ minHeight: 200, overflow: "hidden" }}
      >
        <div>Cropped IMAGE PREVIEW</div>
      </div>
      <button onClick={onCrop}>+ {loading && <div>loading</div>}</button>

      <div
        className={classNames(
          loading ? "visible" : "invisible",
          "relative w-48 border justify-center flex py-6"
        )}
      >
        <div className="overflow-hidden w-36 h-2 text-xs flex rounded bg-pink-200">
          <div
            style={{
              width: `${progressWidth}%`,
              transition: "width .5s ease",
            }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
          ></div>
        </div>
      </div>

      <button onClick={() => setFiles([])}>-</button>
    </div>
  );
});
