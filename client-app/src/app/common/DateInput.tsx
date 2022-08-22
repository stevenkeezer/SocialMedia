import { useField } from "formik";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";

export default function DateInput(props: Partial<ReactDatePickerProps>) {
  const [field, meta, helpers] = useField(props.name!);

  return (
    <div className="space-y-1 px-4 sm:space-y-0 items-center sm:grid sm:grid-cols-5 sm:px-6 pt-0.5">
      <label className="block text-xs tracking-tight text-[#6d6e6f] dark:text-[#a2a0a2]">
        Date
      </label>
      <div className="col-span-3 pb-1">
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 justify-center items-center -ml-1 pl-2 py-0 rounded-full pointer-events-none">
            <svg
              className="w-[1.85rem] h-[1.85rem] text-gray-300"
              focusable="false"
              viewBox="0 0 28 28"
            >
              <path
                stroke="#6d6e6f"
                fill="transparent"
                strokeDasharray="3.8543, 3.8543"
                className="text-transparent"
                d="M27.5,14c0,7.5-6,13.5-13.5,13.5S0.5,21.5,0.5,14c0-4.6,2.3-8.7,5.9-11.2c2.2-1.5,4.8-2.3,7.6-2.3 C21.5,0.5,27.5,6.5,27.5,14z"
              ></path>
              <path
                fill="#a2a0a2"
                d="M18,7V6.5C18,6.2,17.8,6,17.5,6S17,6.2,17,6.5V7h-6V6.5C11,6.2,10.8,6,10.5,6S10,6.2,10,6.5V7c-1.7,0-3,1.3-3,3v8 c0,1.7,1.3,3,3,3h8c1.7,0,3-1.3,3-3v-8C21,8.3,19.7,7,18,7z M10,8v0.5C10,8.8,10.2,9,10.5,9S11,8.8,11,8.5V8h6v0.5 C17,8.8,17.2,9,17.5,9S18,8.8,18,8.5V8c1.1,0,2,0.9,2,2v1H8v-1C8,8.9,8.9,8,10,8z M18,20h-8c-1.1,0-2-0.9-2-2v-6h12v6 C20,19.1,19.1,20,18,20z"
              ></path>
            </svg>
          </div>
          <DatePicker
            {...field}
            className="block w-[15.5rem] text-[#6d6e6f] hover:text-[#1e1f21] tracking-tight border-none cursor-pointer pl-[2.7rem] py-2 sm:text-xs hover:bg-[#424244]/20 bg-transparent rounded-md"
            {...props}
            selected={field.value ? new Date() : null}
            onChange={(date: Date | null) => {
              if (date) helpers.setValue(date);
            }}
          />
        </div>
      </div>
      {meta.touched && !!meta.error ? <div>{meta.error}</div> : null}
    </div>
  );
}
