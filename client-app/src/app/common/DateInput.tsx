import { useField } from "formik";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";

export default function DateInput(props: Partial<ReactDatePickerProps>) {
  const [field, meta, helpers] = useField(props.name!);

  return (
    <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
      <label className="block text-xs text-gray-500  sm:mt-px sm:pt-2">
        Date
      </label>
      <div className="col-span-2">
        <DatePicker
          {...field}
          className="block w-full border py-2 sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 dark:border-[#424244] bg-transparent rounded-md"
          {...props}
          selected={(field.value && new Date(field.value)) || null}
          onChange={(date: Date) => {
            helpers.setValue(date);
          }}
        />
      </div>
      {meta.touched && !!meta.error ? <div>{meta.error}</div> : null}
    </div>
  );
}
