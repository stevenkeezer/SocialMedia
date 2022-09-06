import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { observer } from "mobx-react-lite";
import { classNames } from "../../utils/classNames";

export default observer(function Dropdown({
  buttonClass,
  icon,
  buttonText,
  buttons,
  originLeft,
  originTopRight,
  position,
}: any) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className={buttonClass}>
          <span className="sr-only">Open options</span>
          {icon || <ChevronDownIcon className="w-4 h-4" aria-hidden="true" />}
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
              ? `origin-top-right ${position || "bottom-[3.4rem]"}`
              : "origin-top-right right-0",
            "absolute border border-[#edeae9] py-1 dark:border-[#424244] mt-2 w-56 z-40 rounded-md shadow-lg bg-white dark:bg-[#1e1f21] ring-1 ring-black ring-opacity-5 focus:outline-none"
          )}
        >
          {buttons?.map((button) => (
            <Menu.Item key={button.key}>
              <div className="block w-full text-sm text-left">{button}</div>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
});
