import { useField } from "formik";
import React from "react";

interface Props {
  placeholder?: string;
  name: string;
  label?: string;
}

export default function TextInput(props: Props) {
  const [field, meta] = useField(props.name);

  return (
    <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
      <label className="block text-xs text-gray-500  sm:mt-px sm:pt-2">
        {props.label}
      </label>
      <div className="col-span-2">
        <input
          className="block w-full border px-2 py-2 shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          {...field}
          {...props}
        />
      </div>
      {meta.touched && !!meta.error ? <div>{meta.error}</div> : null}
    </div>
  );
}
