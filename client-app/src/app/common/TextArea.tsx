import { useField, useFormikContext } from "formik";
import React from "react";

interface Props {
  placeholder?: string;
  name: string;
  rows: number;
  label?: string;
}

export default function TextArea(props: Props) {
  const [field, meta] = useField(props.name);

  return (
    <div className="space-y-1 px-3 sm:space-y-0">
      <label className="block text-xs text-gray-500 sm:mt-px py-2 px-2 sm:px-3">
        {props.label}
      </label>
      <div className="">
        <textarea
          className="block w-full border  py-2 sm:text-sm bg-transparent focus:ring-indigo-500 focus:border-indigo-500 border-transparent hover:border-gray-300 dark:hover:border-[#424244]0 rounded-md"
          {...field}
          {...props}
        />
      </div>
      {meta.touched && !!meta.error ? <div>{meta.error}</div> : null}
    </div>
  );
}
