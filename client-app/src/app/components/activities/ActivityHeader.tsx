import { PlusIcon } from "@heroicons/react/outline";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useStore } from "../../../stores/store";
import Dropdown from "../Dropdown/Dropdown";
import Tabs from "../Tabs/Tabs";
import { Activity } from "./Activity";
import { v4 as uuid } from "uuid";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";

export default observer(function ActivityHeader({ title }: any) {
  const { activityStore, userStore } = useStore();
  const { openForm, createActivity } = activityStore;
  const { user, logout, isLoggedIn } = userStore;

  const router = useRouter();

  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: new Date(),
    city: "",
    venue: "",
    isCancelled: false,
    attendees: [],
    hostUsername: user?.username,
    isHost: true,
    isGoing: true,
  });

  return (
    <div className="sticky w-full bg-transparent z-20">
      <div className="border-b pt-1 pb-px border-gray-200 dark:border-[#424244] px-4 sm:flex sm:items-center sm:justify-between sm:px-6">
        <div className="flex-1 min-w-0">
          <div className="flex space-x-4 items-start pt-2">
            {isLoggedIn ? (
              <ProfileDropdown className="h-12 w-12" />
            ) : (
              <Link href="/login">
                <div>Login</div>
              </Link>
            )}
            <div className="space-y-0.5">
              <h1 className="text-xl font-medium leading-6 text-gray-900 dark:text-white sm:truncate">
                {"My Grows"}
              </h1>
              <Tabs />
            </div>
          </div>
        </div>
        <div className="mt-4 flex sm:mt-0 sm:ml-4">
          <button
            type="button"
            onClick={() => {
              let newActivity = { ...activity, id: uuid() };

              createActivity(newActivity).then(() => {
                router.replace(`/list/${newActivity.id}`, "", {
                  scroll: false,
                  shallow: true,
                });
                openForm(newActivity.id);
              });
            }}
            className="order-0 inline-flex items-center p-[.3rem] border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-[#f06a6a] cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:order-1"
          >
            <PlusIcon className="h-4 w-4 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="flex items-center text-xs px-6 space-x-px py-3.5">
        <button className="bg-blue-600 dark:bg-[#4573d2] text-white pl-2 pr-[.57rem] flex items-center py-1.5 rounded-l-md">
          <PlusIcon
            className="h-[.85rem] w-[.85rem] text-white mr-[.23rem]"
            aria-hidden="true"
          />
          <div>Add new</div>
        </button>
        <Dropdown />
      </div>
    </div>
  );
});
