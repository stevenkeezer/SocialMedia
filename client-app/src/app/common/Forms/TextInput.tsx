import { useField, useFormikContext } from "formik";
import React from "react";
import { classNames } from "../../utils/classNames";

interface Props {
  placeholder?: string;
  name: string;
  label?: string;
  type?: string;
  className?: string;
  fieldOnly?: boolean;
}

export const Field = ({ field, props, className }) => (
  <input
    className={classNames(
      className ||
        "block w-full text-[#1e1f21] border px-2 py-2 bg-transparent border-transparent dark:border-transparent sm:text-sm dark:text-white focus:ring-indigo-500 focus:border-indigo-500 dark:focus:border-[#424244] rounded-md"
    )}
    {...field}
    {...props}
  />
);

export default function TextInput(props: Props) {
  const [field, meta] = useField(props.name);
  const { className, fieldOnly } = props;

  if (fieldOnly)
    return <Field field={field} props={props} className={className} />;

  return (
    <div className="items-center px-4 space-y-1 sm:space-y-0 sm:grid sm:grid-cols-5 sm:px-6 gap-x-1">
      <label className="block text-xs tracking-tight text-[#6d6e6f] dark:text-[#a2a0a2]">
        {props.label}
      </label>
      <div className="col-span-4 pb-0.5">
        <Field field={field} props={props} className={className} />
      </div>
      {meta.touched && !!meta.error ? <div>{meta.error}</div> : null}
    </div>
  );
}
