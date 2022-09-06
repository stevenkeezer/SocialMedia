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

  const SelectButton = () => (
    <Listbox.Button
      className={classNames(
        field.value
          ? "rounded-full py-0.5 dark:text-white"
          : "rounded-md py-1.5 text-[#a2a0a2]",
        "dark:group-hover:bg-[rgb(47,48,49)]/70 transition-all group-hover:bg-gray-100 dark:group-hover:text-white transition-color px-2.5 text-xs"
      )}
    >
      <span className="flex items-center">
        <span className="flex items-center truncate">
          {field.value && (
            <div
              className={classNames(
                categoryColors[field.value],
                "w-2 h-2  rounded-full mr-2"
              )}
            />
          )}
          <div className="text-xs capitalize">
            {field.value || "Add category"}
          </div>
        </span>
      </span>
    </Listbox.Button>
  );

  return (
    <Listbox
      value={field.value}
      onChange={(value: string) => {
        field.onChange({ target: { value } });
        helpers.setValue(value);
      }}
    >
      {({ open }) => (
        <div className="items-baseline h-10 pt-2 sm:grid sm:grid-cols-5 sm:px-6">
          <Listbox.Label className="block tracking-tight text-xs text-[#6d6e6f] dark:text-[#a2a0a2]">
            {label}
          </Listbox.Label>
          <div className="relative col-span-4 -ml-1 group">
            <SelectButton />
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
              <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg dark:bg-[#2e2e30] max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((person, index) => (
                  <Listbox.Option
                    key={person.id + index}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "dark:bg-[#2b2c2e] bg-gray-50"
                          : "text-gray-900",
                        "cursor-default select-none dark:hover:bg-[#2b2c2e] hover:bg-gray-50 dark:text-white relative py-2 pl-3 pr-9"
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
