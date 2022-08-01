import { useField } from "formik";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";

export default function DateInput(props: Partial<ReactDatePickerProps>) {
  const [field, meta, helpers] = useField(props.name!);

  return (
    <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-5 sm:px-6 sm:py-1">
      <label className="block text-xs text-gray-500  sm:mt-px sm:pt-2">
        Date
      </label>
      <div className="col-span-3">
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-2 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <DatePicker
            {...field}
            className="block w-56 border-none cursor-pointer pl-10 py-2 sm:text-sm hover:bg-[#424244]/20 bg-transparent rounded-md"
            {...props}
            selected={(field.value && new Date(field.value)) || null}
            onChange={(date: Date) => {
              helpers.setValue(date);
            }}
          />
        </div>
      </div>
      {meta.touched && !!meta.error ? <div>{meta.error}</div> : null}
    </div>
  );
}
