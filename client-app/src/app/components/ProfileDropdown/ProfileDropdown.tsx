import { Menu, Transition } from "@headlessui/react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { useStore } from "../../../stores/store";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default observer(function ProfileDropdown({ className }: any) {
  const router = useRouter();
  const { userStore } = useStore();

  const { user, logout, isLoggedIn } = userStore;
  return (
    <Menu as="div" className="relative">
      <div>
        <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <span className="sr-only">Open user menu</span>
          <img
            className={classNames(
              className ? className : "h-8 w-8",
              "rounded-full border"
            )}
            src={user?.image}
            alt=""
          />
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  View profile
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => {
                    logout;
                    router.push("/login");
                  }}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Logout
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
});
