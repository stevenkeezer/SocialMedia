import React from "react";
import Spinner from "../common/Spinner";

export default function Skeleton({
  inverted = true,
  content = "Loading...",
}: any) {
  return (
    <div>
      <div className="flex justify-center mt-10">
        <Spinner />
      </div>
    </div>
  );
}
