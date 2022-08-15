import { DocumentTextIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { classNames } from "../../utils/classNames";

export default function PhotoLoading({ loading, files }) {
  const [progressWidth, setProgressWidth] = useState<number>(0);

  useEffect(() => {
    if (!loading) setProgressWidth(0);

    if (loading) {
      setTimeout(() => {
        setProgressWidth(100);
      }, 600);
    }
  }, [loading]);

  return (
    <div
      className={classNames(
        loading ? "visible" : "invisible",
        "relative w-auto max-w-[14rem] border justify-center  flex py-1 items-center bg-white dark:bg-[#2a2b2d] border-[#edeae9] dark:border-[#424244] rounded-lg"
      )}
    >
      <div className="pl-1.5">
        <DocumentTextIcon className="h-10 w-10 text-[#a2a0a2]" />
      </div>
      <div className="pl-1.5 pr-5 space-y-1">
        <div className="dark:text-white text-xs leading-1 truncate w-36">
          {files}
        </div>
        <div className="overflow-hidden w-36 h-1.5 text-xs flex rounded bg-gray-500">
          <div
            style={{
              width: `${progressWidth}%`,
              transition: "width .5s ease",
            }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#86bca4]"
          ></div>
        </div>
      </div>
    </div>
  );
}
