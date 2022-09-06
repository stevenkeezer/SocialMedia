import { Menu, Transition } from "@headlessui/react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { useStore } from "../../../stores/store";
import { classNames } from "../../utils/classNames";

export default observer(function ProfileDropdown({ className }: any) {
  const router = useRouter();
  const { userStore, activityStore, commonStore } = useStore();
  const { closeForm } = activityStore;
  const { openModal } = commonStore;
  const {
    query: { id },
  } = router;

  const { user, logout } = userStore;

  const DropdownElements = () => (
    <div className="py-1 text-sm">
      <Menu.Item>
        <div
          onClick={() => {
            closeForm();
            setTimeout(() => {
              router.push({
                pathname: `/0/list/${id}`,
                query: { profile: user.username },
              });
            }, 400);
          }}
          className={classNames("dropdown-item")}
        >
          View profile
        </div>
      </Menu.Item>
      <Menu.Item>
        <div
          onClick={() => openModal("accessibility")}
          className={classNames("dropdown-item")}
        >
          Accessibility
        </div>
      </Menu.Item>

      <Menu.Item>
        <div
          onClick={() => {
            logout;
            router.push("/login");
          }}
          className={classNames("dropdown-item")}
        >
          Logout
        </div>
      </Menu.Item>
    </div>
  );

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-blue-500">
        <span className="sr-only">Open user menu</span>

        <img
          className={classNames(
            className ? className : "h-8 w-8",
            "rounded-full object-cover"
          )}
          src={user?.image}
          alt=""
        />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute left-0 mt-2 w-48 rounded border dark:border-[#424244] dark:lg:bg-[#2e2e30] shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
          <DropdownElements />
        </Menu.Items>
      </Transition>
    </Menu>
  );
});
