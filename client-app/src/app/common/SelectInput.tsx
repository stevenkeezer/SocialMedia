import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/outline";
import { useField } from "formik";
import { Fragment, useState } from "react";

interface SelectProps {
  name: string;
  label: string;
  options: any;
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SelectInput(props: SelectProps) {
  const { name, options, label } = props;
  const [field, meta, helpers] = useField(props);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleChange = (newValue) => {
    setSelectedItem(newValue);
    helpers.setValue(newValue);
  };

  console.log(field, "field");

  return (
    <Listbox
      value={field.value}
      onChange={(value: string) => {
        field.onChange({ target: { value, name } });
        handleChange(value);
      }}
    >
      {({ open }) => (
        <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
          <Listbox.Label className="block text-xs text-gray-500  sm:mt-px sm:pt-2">
            {label}
          </Listbox.Label>
          <div className="col-span-2">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="flex items-center">
                <img
                  src={selectedItem?.avatar}
                  alt=""
                  className="flex-shrink-0 h-6 w-6 rounded-full"
                />
                <span className="ml-3 block truncate">
                  {selectedItem?.name}
                </span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
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
                {options.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <img
                            src={person?.avatar}
                            alt=""
                            className="flex-shrink-0 h-6 w-6 rounded-full"
                          />
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {person.name}
                          </span>
                        </div>
                        {console.log(person.id, field.value.id, "selected")}
                        {person.id === field.value.id ? (
                          <span
                            className={classNames(
                              person.id !== field.value.id
                                ? "text-white"
                                : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
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
