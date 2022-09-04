import {
  ArrowsExpandIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import React from "react";

export default function ZoomActions({ zoomOut, zoomIn, resetZoom, zoom }) {
  return (
    <div className="col-span-8 pr-1 w-full flex items-center">
      <div className="border flex mx-auto items-center rounded">
        <div className="flex space-x-[1.09rem] border-r h-full py-[.3rem] px-[.85rem]">
          <button onClick={zoomOut}>
            <MinusIcon className="w-4 h-4" />
          </button>
          <div className="text-sm font-medium">
            {(zoom * 100).toFixed() + "%"}
          </div>
          <button onClick={zoomIn}>
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center px-3.5 justify-center">
          <button className="" onClick={resetZoom}>
            <ArrowsExpandIcon className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
