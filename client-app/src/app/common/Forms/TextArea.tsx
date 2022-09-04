import { useField } from "formik";
import React from "react";
import { useStore } from "../../../stores/store";
import TextareaAutosize from "react-textarea-autosize";
import { observer } from "mobx-react-lite";

interface Props {
  placeholder?: string;
  name: string;
  rows: number;
  label?: string;
}

export default observer(function TextArea(props: Props) {
  const [field, meta] = useField(props.name);
  const { commonStore } = useStore();
  const { sliderAnimationDone } = commonStore;

  return (
    <div className="space-y-1 pl-2 pt-1 mr-6 sm:space-y-0">
      <label className="block tracking-tight text-xs text-[#6d6e6f] dark:text-[#a2a0a2] sm:mt-px py-2 px-2 sm:px-4">
        {props.label}
      </label>
      <div className="pt-1.5 pl-0.5 min-h-[4.8rem]">
        {sliderAnimationDone && (
          <TextareaAutosize
            cacheMeasurements
            {...props}
            {...field}
            placeholder="Add text description or drop a photo"
            className="block w-full min-h-[4.3rem] focus:ring-0 resize-none border px-3.5 outline-none break-words max-w-[39.1rem] py-[.525rem] sm:text-sm bg-transparent active:border-[#a2a0a2] dark:focus:border-[#a2a0a2] focus:border-[#6d6e6f] border-transparent hover:border-[#afabac] dark:hover:border-[#565557] rounded-md"
          />
        )}
      </div>
      {meta.touched && !!meta.error ? <div>{meta.error}</div> : null}
    </div>
  );
});
