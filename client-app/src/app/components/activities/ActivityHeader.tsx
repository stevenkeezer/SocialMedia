import { PlusIcon } from "@heroicons/react/solid";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useStore } from "../../../stores/store";
import Tabs from "../../common/Tabs/Tabs";
import { Activity } from "../../models/Activity";
import { v4 as uuid } from "uuid";
import ProfileDropdown from "../Profile/ProfileDropdown";
import { SearchIcon } from "@heroicons/react/outline";

export default observer(function ActivityHeader() {
  const { activityStore, userStore } = useStore();
  const { openForm, createActivity, setPredicate } = activityStore;
  const { user, isLoggedIn } = userStore;

  const [typingTimeout, setTypingTimeout] = useState<any>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: null,
    city: "",
    venue: "",
    isCancelled: false,
    attendees: [],
    hostUsername: user?.username,
    isHost: true,
    isGoing: true,
    isDraft: true,
    mainImage: "",
    activityPhotos: [],
    image: "",
    commentCount: 0,
  });

  const router = useRouter();

  function handleTyping() {
    setIsTyping(true);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(
      setTimeout(() => {
        setIsTyping(false);
      }, 500)
    );
  }

  useEffect(() => {
    if (!isTyping) setPredicate("searchTerm", searchValue);
  }, [isTyping]);

  return (
    <div className="sticky z-20 w-full bg-transparent">
      <div className="border-b pt-1 pb-px border-[#edeae9] dark:border-[#424244] px-4 sm:flex sm:items-center sm:justify-between sm:px-6">
        <div className="flex-1 min-w-0">
          <div className="flex space-x-[1rem] items-start pt-2">
            {isLoggedIn ? (
              <ProfileDropdown className="w-12 h-12" />
            ) : (
              <Link href="/login">
                <div>Login</div>
              </Link>
            )}
            <div className="-mt-[2px]">
              <h1 className="text-[1.25rem] font-medium leading-[28px] text-gray-900 dark:text-white sm:truncate">
                {"Events"}
              </h1>
              <Tabs />
            </div>
          </div>
        </div>
        <div className="flex sm:ml-4 space-x-4 mb-0.5 items-center">
          <div className="w-full">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon
                  className="w-4 h-4 text-gray-400"
                  aria-hidden="true"
                />
              </div>

              <input
                id="search"
                name="search"
                autoComplete="off"
                className="block w-36 transition-all bg-white dark:bg-transparent dark:text-white dark:border-[#565557] placeholder:text-[#a2a0a2] border focus:outline-0 pr-2 focus:w-[28rem] duration-200 border-gray-300 rounded-full py-[.33rem] pl-10 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 sm:text-sm"
                placeholder="Search"
                onChange={(e) => {
                  handleTyping();
                  setSearchValue(e.target.value);
                }}
                type="search"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              let newActivity = {
                ...activity,
                id: uuid(),
                isDraft: true,
                date: null,
              };

              createActivity(newActivity).then(() => {
                router.replace(`/0/list/${newActivity.id}`, "", {
                  scroll: false,
                  shallow: true,
                });
                openForm(newActivity.id);
              });
            }}
            className="order-0 mb-0.5 inline-flex items-center p-[.3rem] border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-[#f06a6a] cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:order-1"
          >
            <PlusIcon className="w-4 h-4 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
});
