import { useField, useFormikContext, useFormik } from "formik";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useStore } from "../../stores/store";

interface Props {
  placeholder?: string;
  name: string;
  rows: number;
  label?: string;
}

export default function TextArea(props: Props) {
  const [field, meta] = useField(props.name);
  const { setFieldValue, isSubmitting } = useFormikContext();
  const { userStore, profileStore, activityStore } = useStore();
  const [resetTextArea, setResetTextArea] = useState(false);
  const { selectedActivity } = activityStore;
  const { user } = userStore;

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
    <div className="space-y-1 pl-2 pt-1 mr-6 sm:space-y-0">
      <label className="block tracking-tight text-xs text-[#6d6e6f] dark:text-[#a2a0a2] sm:mt-px py-2 px-2 sm:px-4">
        {props.label}
      </label>
      <div onClick={() => setResetTextArea(true)} className="pt-1.5 pl-0.5">
        <div
          contentEditable={selectedActivity?.host?.username === user?.username}
          data-ph="Add text description or drop a photo"
          ref={ref}
          className="block w-full min-h-[4.3rem] border px-3.5 break-words max-w-[39.1rem] py-[.525rem] sm:text-sm bg-transparent active:border-[#a2a0a2] outline-none dark:focus:border-[#a2a0a2] focus:border-[#6d6e6f] border-transparent hover:border-[#afabac] dark:hover:border-[#565557] rounded-md"
          {...props}
          role="textbox"
        />
      </div>
      {meta.touched && !!meta.error ? <div>{meta.error}</div> : null}
    </div>
  );
}
