import { ExclamationCircleIcon } from "@heroicons/react/outline";
import React from "react";

export default function SliderBanner({ icon, text }) {
  return (
    <div className="dark:bg-[#252628] text-[#1e1f21] dark:text-white tracking-tight bg-[#f9f8f8] items-center text-sm py-3 px-6 flex w-full">
      {icon}
      {text}
    </div>
  );
}
