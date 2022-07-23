import React from "react";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";

interface Props {
  imagePreview: string;
  setCropper: (cropper: Cropper) => void;
}

export default function PhotoCropper({ imagePreview, setCropper }: Props) {
  return (
    <Cropper
      style={{ height: 400, width: "100%" }}
      zoomTo={0.5}
      aspectRatio={1}
      initialAspectRatio={1}
      preview=".img-preview"
      src={imagePreview}
      viewMode={1}
      minCropBoxHeight={10}
      minCropBoxWidth={10}
      zoomable={false}
      background={false}
      responsive={true}
      autoCropArea={1}
      checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
      onInitialized={(instance) => {
        setCropper(instance);
      }}
      guides={true}
    />
  );
}
