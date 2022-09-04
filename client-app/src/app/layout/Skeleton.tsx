import React from "react";
import Spinner from "../common/Spinner";

export default function Skeleton() {
  return (
    <div className="flex justify-center mt-10">
      <Spinner />
    </div>
  );
}
