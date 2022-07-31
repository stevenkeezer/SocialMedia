import { useField, useFormikContext, useFormik } from "formik";
import React, { ChangeEvent, useEffect, useRef } from "react";

interface Props {
  placeholder?: string;
  name: string;
  rows: number;
  label?: string;
}

export default function TextArea(props: Props, { activity }) {
  const [field, meta] = useField(props.name);
  const { setFieldValue, isSubmitting } = useFormikContext();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.innerText = field.value;
    }
  }, [field.value]);

  useEffect(() => {
    if (ref && ref.current && isSubmitting) {
      setFieldValue(props.name, ref.current.innerText);
    }
  }, [field.value, isSubmitting]);

  return (
    <div className="space-y-1 pl-2 pr-6 sm:space-y-0">
      <label className="block text-xs text-gray-500 sm:mt-px py-2 px-2 sm:px-4">
        {props.label}
      </label>
      <div className="pt-1">
        <div
          contentEditable
          ref={ref}
          className="block w-full min-h-[5rem] border px-4 py-3 sm:text-sm bg-transparent focus:ring-white focus:border-white border-transparent hover:border-gray-300 dark:hover:border-[#424244]0 rounded-md"
          {...props}
          role="textbox"
        />
      </div>
      {meta.touched && !!meta.error ? <div>{meta.error}</div> : null}
    </div>
  );
}
