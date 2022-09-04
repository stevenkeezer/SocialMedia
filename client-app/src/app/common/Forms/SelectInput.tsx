import { Listbox, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useField } from "formik";
import { Fragment } from "react";
import { categoryColors } from "../../consts/categoryOptions";
import { classNames } from "../../utils/classNames";

interface SelectProps {
  name: string;
  label: string;
  options: any;
}

export default function SelectInput(props: SelectProps) {
  const { options, label } = props;
  const [field, meta, helpers] = useField(props);

  return (
    <Listbox
      value={field.value}
      onChange={(value: string) => {
        field.onChange({ target: { value } });
        helpers.setValue(value);
      }}
    >
      {({ open }) => (
        <div className="pt-1 items-baseline h-9 sm:grid sm:grid-cols-5 sm:px-6">
          <Listbox.Label className="block tracking-tight text-xs text-[#6d6e6f] dark:text-[#a2a0a2]">
            {label}
          </Listbox.Label>
          <div className="col-span-4 -ml-1 relative group">
            <Listbox.Button
              className={classNames(
                field.value
                  ? "rounded-full py-0.5 dark:text-white"
                  : "rounded-md py-1.5 text-[#a2a0a2]",
                "dark:group-hover:bg-[rgb(47,48,49)]/70 group-hover:bg-gray-100 dark:group-hover:text-white transition-color px-2.5 text-xs"
              )}
            >
              <span className="flex items-center">
                <span className="truncate flex items-center">
                  {field.value && (
                    <div
                      className={classNames(
                        categoryColors[field.value],
                        "w-2 h-2  rounded-full mr-2"
                      )}
                    />
                  )}
                  <div className="capitalize text-xs">
                    {field.value || "Add category"}
                  </div>
                </span>
              </span>
            </Listbox.Button>
            {field.value && (
              <span
                className="pl-2 opacity-0 group-hover:opacity-100"
                onClick={() => {
                  helpers.setValue(null);
                }}
              >
                <XIcon className="w-3.5 h-3.5 inline-flex cursor-pointer" />
              </span>
            )}
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
                        active ? "bg-gray-100" : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={person.value}
                  >
                    <div className="flex items-center space-x-2.5">
                      <div
                        className={classNames(
                          categoryColors[person.value],
                          "w-2.5 h-2.5 rounded-full"
                        )}
                      />
                      <div>{person.text}</div>
                    </div>
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
