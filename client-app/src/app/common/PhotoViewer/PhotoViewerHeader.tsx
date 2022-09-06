import { XIcon } from "@heroicons/react/outline";
import { format } from "date-fns";
import React from "react";
import { ActivityPhoto } from "../../models/profile";
import ZoomActions from "./ZoomActions";

interface Props {
  activityPhotos: ActivityPhoto[];
  mainImage: number;
  zoom: number;
  zoomOut: () => void;
  zoomIn: () => void;
  resetZoom: () => void;
  closePhotoViewer: () => void;
}

export default function PhotoViewerHeader({
  activityPhotos,
  mainImage,
  zoomOut,
  zoomIn,
  zoom,
  resetZoom,
  closePhotoViewer,
}: Props) {
  const PhotoInfo = () => (
    <div className="flex-col col-span-2 space-y-0.5 pl-2">
      <div className="text-sm whitespace-nowrap">
        {activityPhotos[mainImage]?.fileName}
      </div>
      <div className="text-sm text-gray-300">
        {activityPhotos[mainImage]?.createdAt &&
          format(activityPhotos[mainImage]?.createdAt, "MMMM dd, yyyy")}{" "}
        <span className="pl-0.5"> at </span>
        {activityPhotos[mainImage]?.createdAt &&
          format(activityPhotos[mainImage]?.createdAt, "hh:mm a")}
      </div>
    </div>
  );

  const CloseButton = () => (
    <div className="h-[3.75rem] col-span-2 border-[#424244] flex justify-end">
      <div className=" border-l border-[#424244] h-full flex items-center  pl-3 justify-center">
        <button
          type="button"
          className="inline-flex justify-center rounded-lg px-2 py-2 text-sm font-medium text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => {
            closePhotoViewer();
          }}
        >
          <XIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-12 text-white items-center pl-4 pr-3 border-b border-[#424244]">
      <PhotoInfo />
      <ZoomActions
        zoomOut={zoomOut}
        zoomIn={zoomIn}
        resetZoom={resetZoom}
        zoom={zoom}
      />
      <CloseButton />
    </div>
  );
}
