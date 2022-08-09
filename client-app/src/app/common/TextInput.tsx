import { useField, useFormikContext } from "formik";
import React from "react";

interface Props {
  placeholder?: string;
  name: string;
  label?: string;
  type?: string;
}

export default function TextInput(props: Props) {
  const [field, meta] = useField(props.name);
  const { values } = useFormikContext();

  return (
    <div className="space-y-1 px-4 items-center sm:space-y-0 sm:grid sm:grid-cols-5 sm:px-6 gap-x-1">
      <label className="block text-xs tracking-tight text-[#6d6e6f] dark:text-[#a2a0a2]">
        {props.label}
      </label>
      <div className="col-span-4 pb-0.5">
        <input
          className="block w-full border px-2 py-2 bg-transparent border-transparent dark:border-transparent sm:text-sm text-gray-500 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 dark:focus:border-[#424244] rounded-md"
          {...field}
          {...props}
        />
      </div>
      {meta.touched && !!meta.error ? <div>{meta.error}</div> : null}
    </div>
  );
}
