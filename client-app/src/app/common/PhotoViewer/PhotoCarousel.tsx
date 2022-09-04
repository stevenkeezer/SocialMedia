import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import React from "react";
import { classNames } from "../../utils/classNames";

export default function PhotoCarousel({
  moreThanOne,
  getPreviousImage,
  getNextImage,
  activityPhotos,
  mainImage,
  containerHeight,
  zoom,
}) {
  return (
    <div className="flex flex-col">
      {moreThanOne && (
        <ChevronLeftIcon
          onClick={() => getPreviousImage(mainImage)}
          className="w-9 h-9 p-2 bg-gray-900/50 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md text-white absolute left-8 top-[47.4%]"
        />
      )}
      <div
        className={classNames(
          containerHeight,
          "flex justify-center items-center overflow-y-auto max-w-[1250px] mx-auto mt-11 px-6"
        )}
      >
        <img
          src={activityPhotos[mainImage]?.url}
          alt=""
          style={{
            width: zoom * 100 + "%",
            height: 100 + "%",
          }}
        />
      </div>
      {moreThanOne && (
        <ChevronRightIcon
          onClick={() => getNextImage(mainImage)}
          className="w-9 h-9 p-2 bg-gray-900/50 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300  rounded-md text-white absolute right-8 top-[47.4%]"
        />
      )}
    </div>
  );
}
