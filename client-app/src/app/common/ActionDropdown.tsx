import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { useStore } from "../../stores/store";
import { classNames } from "../utils/classNames";
import { Activity } from "../models/Activity";
import { useRouter } from "next/router";

interface Props {
  activity: Activity;
}

export default function ActionDropdown({ activity }: Props) {
  const { activityStore } = useStore();
  const { deleteActivity } = activityStore;
  const router = useRouter();

  return (
    <Menu as="div" className="relative inline-block z-30">
      <div>
        <Menu.Button className="rotate-90 rounded-full mr-px flex items-center text-[#6d6e6f] dark:text-[#a2a0a2] hover:text-gray-600 focus:outline-none">
          <span className="sr-only">Open options</span>
          <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg dark:bg-[#252628] bg-[#f9f8f8] ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              <a href="#" className={classNames("dropdown-item")}>
                Account settings
              </a>
            </Menu.Item>
            <Menu.Item>
              <a href="#" className={classNames("dropdown-item")}>
                Support
              </a>
            </Menu.Item>
            <Menu.Item>
              <a href="#" className={classNames("dropdown-item")}>
                License
              </a>
            </Menu.Item>
            <Menu.Item>
              <button
                type="button"
                onClick={() => {
                  deleteActivity(activity.id);
                  activityStore.closeForm();
                  setTimeout(() => {
                    router.push("/0/list/0");
                  }, 400);
                }}
                className={classNames("dropdown-item", "w-full text-red-500")}
              >
                Delete
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
