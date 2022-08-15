/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { classNames } from "../../utils/classNames";

export default observer(function Dropdown({
  data,
  buttonClass,
  icon,
  buttonText,
  children,
  originLeft,
  originTopRight,
}: any) {
  const { commentStore } = useStore();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className={buttonClass}>
          <span className="sr-only">Open options</span>
          {icon || <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />}
          <div>{buttonText}</div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={classNames(
            originLeft
              ? "origin-top-left left-0"
              : originTopRight
              ? "origin-top-right bottom-[3.4rem]"
              : "origin-top-right right-0",

            "absolute border border-gray-600 mt-2 w-56 z-40 rounded-md shadow-lg bg-white dark:bg-[#1e1f21] ring-1 ring-black ring-opacity-5 focus:outline-none"
          )}
        >
          <div className="py-1">
            {/* <Menu.Item>
              <div
                className={classNames(
                  "bg-gray-100 text-gray-900",
                  "block w-full text-left px-4 py-2 text-sm"
                )}
              > */}
            {children}
            {/* </div> */}
            {/* </Menu.Item> */}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
});
