import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/outline";
import { useField } from "formik";
import { Fragment, useState } from "react";
import { classNames } from "../utils/classNames";

interface SelectProps {
  name: string;
  label: string;
  options: any;
}

export default function SelectInput(props: SelectProps) {
  const { name, options, label } = props;
  const [field, meta, helpers] = useField(props);

  return (
    <Listbox
      value={field.value}
      onChange={(value: string) => {
        console.log(value);
        field.onChange({ target: { value } });
        helpers.setValue(value);
      }}
    >
      {({ open }) => (
        <div className="pt-1 items-baseline sm:grid sm:grid-cols-5 sm:px-6">
          <Listbox.Label className="block tracking-tight text-xs text-[#6d6e6f] dark:text-[#a2a0a2]">
            {label}
          </Listbox.Label>
          <div className="col-span-4  -ml-2.5 relative">
            <Listbox.Button className="relative w-full h-10 py-1.5 bg-white dark:bg-transparent border-transparent dark:border-transparent border rounded-md pl-1.5 pr-10 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="flex items-center">
                <span className="ml-3 truncate flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-400 upp rounded-full" />

                  <div className="capitalize text-sm">{field.value}</div>
                </span>
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {options.map((person, index) => (
                  <Listbox.Option
                    key={person.id + index}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-indigo-600" : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={person.value}
                  >
                    {/* {console.log(person, "person.value")} */}
                    <div className="flex items-center space-x-2.5">
                      <div className="w-2.5 h-2.5 bg-red-400 rounded-full" />
                      <div>{person.text}</div>
                    </div>
                    {/* {({ selected, active }) => (
                      <div className="flex items-center">
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "ml-3 block truncate text-black dark:bg-red-500"
                          )}
                        >
                          {person.name}hi
                        </span>
                      </div>
                    )} */}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
}
