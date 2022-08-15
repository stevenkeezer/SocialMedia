import { useField, useFormikContext } from "formik";
import React from "react";

interface Props {
  placeholder?: string;
  name: string;
  label?: string;
  type?: string;
}

export default function TextInputLg(props: Props) {
  const [field, meta] = useField(props.name);
  const { values } = useFormikContext();

  return (
    <div className="space-y-1 sm:space-y-0 sm:py-2 pl-2.5 pr-6 mt-[.3rem]">
      <div className="col-span-2">
        <input
          className="block w-full border px-3 py-[.4rem] bg-transparent border-white dark:border-transparent font-medium sm:text-2xl text-gray-800 dark:text-white focus:ring-blue-800 focus:border-blue-700 focus:ring-2 rounded-md"
          {...field}
          {...props}
          placeholder="Write an event name"
        />
      </div>
      {meta.touched && !!meta.error ? <div>{meta.error}</div> : null}
    </div>
  );
}
