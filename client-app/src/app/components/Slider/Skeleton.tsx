import React from "react";
import { classNames } from "../../utils/classNames";

export default function Skeleton({ skeleton }) {
  return (
    <div className="p-6">
      <div className={classNames(skeleton, "h-5 ml-2.5 w-24 rounded")} />
      <div className="flex flex-col py-4 space-y-2 pl-12 pr-1">
        <div className={classNames(skeleton, "h-4 w-full rounded")} />
        <div className={classNames(skeleton, "h-4 w-full rounded")} />
      </div>
    </div>
  );
}
